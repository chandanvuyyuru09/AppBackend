var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/recordsdb', { useMongoClient: true });
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
//Get the default connection
let db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/*
var authorSchema = new Schema({
  _id:  {type:Number, required:true},
  fName: {type:String, required:true},
  lName: {type:String, required:true},
  mName: String
});

var Author = mongoose.model('Author', authorSchema);
*/
module.exports = mongoose;
