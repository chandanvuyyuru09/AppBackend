let mongoose = require('../db');
let Schema = mongoose.Schema;
let recordSchema = new Schema({
  first: {type:Number, required:true},
  second: {type:Number, required:true},
  result: {type:Number, required:true}
},{collection:'records'});

let Record = mongoose.model('Record', recordSchema);

module.exports = Record;
