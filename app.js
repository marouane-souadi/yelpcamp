var express         = require("express"),
    app             = express(),
    passport        = require("passport"),
    bodyParser      = require("body-parser"),
    localStrategy   = require("passport-local"),
    mongoose        = require("mongoose"),
    seedDB          = require("./seeds"),
    User            = require("./models/user"),
    session         = require("express-session"),
    methodOverride  = require("method-override"),
    flash           = require("connect-flash");

// Requiring routes
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require('./routes/campgrounds'),
    indexRoutes         = require("./routes/index");

var mongoConnectString = process.env.DATABASEURL || "mongodb://localhost/yelpcamp" ;
var serverPORT = process.env.PORT || 8080;

mongoose.connect(mongoConnectString, {useNewUrlParser:true}, function(err){
    if (err) console.log("error connection to DB");
    else console.log("success connected to DB");
});

app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.use(flash());
//==========================
// PASSPORT Configuration
//==========================
app.use(session({
    secret : "This is the secret phrase for session",
    resave : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// seedDB(); // Seed the database

// User passes to all pages
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

var server = app.listen(serverPORT, function(){
    console.log("YelpCamp Server started on "+ server.address().address + " port : "+server.address().port);
});