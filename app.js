var express = require('express');
var http = require('http');
var path = require('path');
 md5 = require('md5');
var config = require('./config');
var engine = require('ejs-locals');
var mysql      = require('mysql');
var body_parser   = require('body-parser');
//var cookieParser = require('cookie-parser');
var session = require('client-sessions');
var validator = require('express-validator');




var app = express();
var port=config.get('port');
var db_conf=config.get('db_conf');

var server = http.createServer(app);
 server.listen(port);

var io = require('socket.io')(server);

var pool  = mysql.createPool(db_conf);
require('./models/user_model')(pool);
require('./controllers/user')(db);


app.engine('ejs', engine);
//app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false}));
app.use(validator());

//app.use(cookieParser());
app.use(session({
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration:  5 * 1000,
    activeDuration: 5 * 60 * 1000,
}));







function  select_db(req,res){


    pool.query('SELECT * from chat', function(err, rows, fields) {
            if (!err) {
                res.render('index', {
                    mess: rows,
                    title: 'chat'
                });

                console.log('aaaaa.');

            }else{
                console.log('Error while performing Query.');
            }

        });
}







// Routes



var sess;
//
//app.get('/', function(req,res,next){
//  //res.render('index',{
//  //    title:'chat'
//  //});
//    sess=req.session;
//    sess.o='ooo';
//    sess.o1='ooo1';
//    sess.o2='ooo2';
//
//    //delete sess.o1;
//    //sess.destroy();
//
//   // req.cookies.ttt=99;
//
//
//    console.log("Cookies: ", req.cookies);
//    console.log("sess: ", sess);
//    select_db(req,res);
//
//
//});



//conect  js , css

app.get('/public/css/style.css',function(req,res,next){
    res.sendfile('public/css/style.css');
});

app.get('/public/js/Jquery.js',function(req,res,next){
	res.sendfile('public/js/Jquery.js');
});


app.get('/public/js/script.js',function(req,res,next){
    res.sendfile('public/js/script.js');
});


app.get('/',require('./controllers/home'));

app.get('/sign_up',sign_up_get);
app.post('/sign_up',sign_up_post);

app.get('/login',login_get);
app.post('/login',login_post);

app.get('/logout',logout);





//app.post('/', function(req,res,next){
//    var mess = req.body.mesage;
//    var ins = {"mesage":mess};
//    pool.query('INSERT INTO chat SET ?', ins, function(err, result) {
//        console.log(err);
//        console.log(result);
//    });
//
//    res.redirect('/');
//
//    //connection.query('SELECT * from chat', function(err, rows, fields) {
//    //    if (!err) {
//    //
//    //        res.render('index', {
//    //            mess: rows,
//    //            title: 'chat'
//    //        });
//    //
//    //        console.log('aaaaa.');
//    //
//    //    }else{
//    //        console.log('Error while performing Query.');
//    //    }
//    //
//    //});
//
//});


app.use('/aa',function(req,res,next){
	
	res.render('home2', {
		title: 'home2'
	});

   io.on('connection', function (socket) {
	  
	  socket.on('mes_s', function (text,cb) {
		socket.broadcast.emit('mes_c', text);
		cb(888);
	  });
	});
});

 


