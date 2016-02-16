module.exports = function(db){

    sign_up_get = function(req,res,next){
        res.render('user/sign_up', {

            title: 'sign_up'
        });
    };

    sign_up_post = function(req,res,next) {
       // var email = req.body.email;
        //var pass = md5(req.body.pass);

        req.sanitize('first_name').trim();
        req.sanitize('last_name').trim();
        req.sanitize('email').trim();
        req.sanitize('password').trim();
        req.sanitize('password2').trim();
        var post = req.body;

        req.checkBody('first_name',"The First name field is required.").isAlpha().withMessage("The First name field may only contain alphabetical characters.").notEmpty();
        req.checkBody('last_name',"The Last name field is required.").isAlpha().withMessage("The Last name field may only contain alphabetical characters.").notEmpty();
        req.checkBody('email',"The Email field is required.").isEmail().withMessage("The Email field must contain a valid email address.").notEmpty();
        req.checkBody('password',"The Password field is required.").notEmpty();
        req.checkBody('password2',"The Confirm password field is required.").equals(req.body.password).withMessage("The Confirm password field does not match the Password field.").notEmpty();



        //req.checkBody("aa", "Enter a valid email address.").notEmpty().isInt();

        var validation_errors = req.validationErrors(true);
        if (validation_errors) {
            res.render('user/sign_up', {
                title: 'sign_up',
                post: post,
                validation_errors: validation_errors
            });
        } else {
            var ins = {
                "first_name":req.body.first_name,
                "last_name":req.body.last_name,
                "email":req.body.email,
                "password":md5(req.body.password)
            };
            db.sign_up(ins, function (err, rows, fields) {
                if (!err) {
                    console.log(rows, fields);
                    sess = req.session;
                    sess.user = 'ooo';
                    console.log("sess: ", sess);
                    res.redirect('/');
                } else {
                    console.log('Error while performing Query.');
                }
            });
        }
    };

    login_get = function(req,res,next){
        res.render('user/login', {

            title: 'login'
        });
    };

     login_post = function(req,res,next) {
         var email = req.body.email;
         var pass = md5(req.body.pass);

         req.checkBody('email').isEmail();
         req.body.aa='rrr';

         req.check('testparam', 'Error Message').notEmpty().withMessage('Email is required').isInt();
        // console.log(req.checkBody('email'));
         req.checkBody("aa", "Enter a valid email address.").notEmpty().isInt();

         var errors = req.validationErrors();
         if (errors) {
             res.send(errors);
             return;
         } else {

             db.login(email, pass, function (err, rows, fields) {
                 if (!err) {
                     console.log(rows, fields);
                     sess = req.session;
                     sess.user = 'ooo';
                     console.log("sess: ", sess);
                     res.redirect('/');
                 } else {
                     console.log('Error while performing Query.');
                 }
             });
        }
    };

    logout = function(req,res,next){
        //sess.destroy();
       delete sess.user;
        res.redirect('/');
    };

};