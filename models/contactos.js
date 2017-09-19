let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/login");

var usr_grupoSchemaJSON=new mongoose.Schema({
    nombre:String ,
    usuario:{type:mongoose.Schema.ObjectId,ref:"users"} ,
    usr_grupo:{type:mongoose.Schema.ObjectId,ref:"usr_grupo"} ,
    status:Number,
    falta:Date
});

var mContacto = mongoose.model("contacto",usr_grupoSchemaJSON);

module.exports.mContacto=mContacto;