let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/login");

var SchemaJSON=new mongoose.Schema({
    usuario:{type:mongoose.Schema.ObjectId,ref:"perfil"} ,//relacion uno a uno con usuario
    fondo:String ,
    avatar:String,
    privacidad:Boolean
});

module.exports.mPerfil=mongoose.model("perfil",SchemaJSON);