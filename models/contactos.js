let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/login");

var usr_grupoSchemaJSON=new mongoose.Schema({
    email:String ,
    usuario:{type:mongoose.Schema.ObjectId,ref:"users"} ,//relacion usuario 1:M contactos
    usr_grupo:{type:mongoose.Schema.ObjectId,ref:"usr_grupo"} ,//relacion  grupo 1:M contactos
    status:Number,//solicitud, autorizado
    falta:Date
});

var mContacto = mongoose.model("contacto",usr_grupoSchemaJSON);

module.exports.mContacto=mContacto;