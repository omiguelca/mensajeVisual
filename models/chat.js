let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/login");

var usr_grupoSchemaJSON=new mongoose.Schema({
    usuario:{type:mongoose.Schema.ObjectId,ref:"users"} ,
    contacto:{type:mongoose.Schema.ObjectId,ref:"contactos"} ,
    mensaje:String,
    fecha:Date
});

var mChat = mongoose.model("chat",usr_grupoSchemaJSON);

module.exports.mChat=mChat;