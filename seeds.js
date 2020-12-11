var Campground  = require("./models/campground");
var Comment     = require("./models/comment");
var data = [
    {
        name : "Aouana",
        image : "/images/aouana.jpg",
        description : "Quisque elementum libero vitae commodo interdum. Proin pulvinar rutrum enim nec facilisis. Mauris sagittis felis elit, in lobortis velit laoreet ut. Fusce venenatis sed tellus vel mollis. Pellentesque varius dapibus felis, non feugiat ex interdum eu. Nunc aliquet mollis dolor, eget dapibus nulla tempor a. In sit amet pretium nulla, eu scelerisque purus. Pellentesque porta, mi nec condimentum viverra, nulla orci convallis leo, et tempus leo metus quis sapien. Quisque pulvinar vestibulum gravida. Aenean vel ligula et dui rhoncus bibendum viverra sed mauris. Maecenas pharetra posuere neque, ut rhoncus lacus convallis malesuada. Duis cursus mauris ac dui lobortis varius. Cras dignissim ex sed nulla fermentum pretium. "
    },
    {
        name : "Aftis",
        image : "/images/aftis.jpg",
        description : "Quisque elementum libero vitae commodo interdum. Proin pulvinar rutrum enim nec facilisis. Mauris sagittis felis elit, in lobortis velit laoreet ut. Fusce venenatis sed tellus vel mollis. Pellentesque varius dapibus felis, non feugiat ex interdum eu. Nunc aliquet mollis dolor, eget dapibus nulla tempor a. In sit amet pretium nulla, eu scelerisque purus. Pellentesque porta, mi nec condimentum viverra, nulla orci convallis leo, et tempus leo metus quis sapien. Quisque pulvinar vestibulum gravida. Aenean vel ligula et dui rhoncus bibendum viverra sed mauris. Maecenas pharetra posuere neque, ut rhoncus lacus convallis malesuada. Duis cursus mauris ac dui lobortis varius. Cras dignissim ex sed nulla fermentum pretium. "
    },
    {
        name : "Taza",
        image : "/images/taza.jpg",
        description : "Quisque elementum libero vitae commodo interdum. Proin pulvinar rutrum enim nec facilisis. Mauris sagittis felis elit, in lobortis velit laoreet ut. Fusce venenatis sed tellus vel mollis. Pellentesque varius dapibus felis, non feugiat ex interdum eu. Nunc aliquet mollis dolor, eget dapibus nulla tempor a. In sit amet pretium nulla, eu scelerisque purus. Pellentesque porta, mi nec condimentum viverra, nulla orci convallis leo, et tempus leo metus quis sapien. Quisque pulvinar vestibulum gravida. Aenean vel ligula et dui rhoncus bibendum viverra sed mauris. Maecenas pharetra posuere neque, ut rhoncus lacus convallis malesuada. Duis cursus mauris ac dui lobortis varius. Cras dignissim ex sed nulla fermentum pretium. "
    }
];


function seedDB(){
    //Remove all Campgrounds
    Campground.deleteMany({}, function(err){
        if (err) console.log(err);
        else {
            console.log("Removed campgrounds");
            Comment.deleteMany({}, function(err){
                if (err) console.log(err);
                else {
                    console.log("Removed Comments");
                    //Add a few campgrounds
                    data.forEach(function(seed){
                        Campground.create(seed, function(err, campground){
                            if (err) console.log(err);
                            else {
                                console.log("Added campground");
                                // Create a comment
                                Comment.create({
                                    text : "This is a great place",
                                    author : 'one'
                                }, function(err, comment){
                                    if (err) console.log(err);
                                    else {
                                        campground.comments.push(comment);
                                        campground.save();
                                        console.log("created a new comment");
                                    }
                                });
                            }
                        });
                        
                    });                      
                }

            });                    
        }
    });    
}

module.exports = seedDB;