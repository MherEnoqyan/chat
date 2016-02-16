var home = function(req,res,next){
    res.render('home', {
        title: 'home'
    });
}

module.exports = home;