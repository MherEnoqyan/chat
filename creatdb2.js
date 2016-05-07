var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chat');

var Schema = mongoose.Schema({
	name: String
});

Schema.methods.aa=function(){
	console.log(this.get('name'));
}

//var Cat = mongoose.model('Cat', { name: String });
var Cat = mongoose.model('Cat',Schema);

var kitty = new Cat({ name: 'new_name2' });
 kitty.aa();
console.log(kitty);
console.log(777777);
kitty.save(function (err,kitty,affectid) {
  // if (err) {
    // console.log(err);
  // } else {
    // console.log(arguments);
  // }
  kitty.aa();
});