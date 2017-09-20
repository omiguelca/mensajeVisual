let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/login");

var usr_grupoSchemaJSON=new mongoose.Schema({
    usuario:{type:mongoose.Schema.ObjectId,ref:"users"} ,// usuario 1:M mensajes
    contacto:{type:mongoose.Schema.ObjectId,ref:"contactos"} ,// contacto 1:M mensajes
    mensaje:String,
    fecha:Date
});

var mChat = mongoose.model("chat",usr_grupoSchemaJSON);

module.exports.mChat=mChat;