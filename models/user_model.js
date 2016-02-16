
module.exports = function(pool){
    db =  {
        sign_up:function(ins,callback){
            pool.query('INSERT INTO user SET ?', ins,callback);
        },

        login:function(email,pass,callback){
            var ins = {"email":email,"pass":pass};
            pool.query('INSERT INTO user SET ?', ins,callback);
        }
    };
};