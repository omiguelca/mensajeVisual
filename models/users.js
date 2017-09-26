let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/login");

var usersSchemaJSON=new mongoose.Schema({
    email:String ,
    nombre:String ,
    password:String,
    status:Boolean //sin confirmar,confirmado correo
});
usersSchemaJSON.index({email: 1}, {unique: true});
/*
var animalSchema = new Schema({
  name: String,
  type: String,
  tags: { type: [String], index: true } // field level
});
//mySchema.index({field1: 1, field2: 1}, {unique: true});
animalSchema.index({ name: 1, type: -1 }); // schema level
*/
var mUsers = mongoose.model("users",usersSchemaJSON);

module.exports.mUsers=mUsers;