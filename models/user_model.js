
module.exports = function(pool){
    db =  {
        sign_up:function(ins,callback){
            pool.query('INSERT INTO users SET ?', ins,callback);
        },

        login:function(email,password,callback){           
            pool.query('Select * from users where email=? and password=?', [email,password],callback);
        }
    };
};