let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/login");

var usr_grupoSchemaJSON=new mongoose.Schema({
    nombre:String ,
    usuario:{type:mongoose.Schema.ObjectId,ref:"users"} //relacion muchos a uno con usuario
});

var mUsrGrupo = mongoose.model("usr_grupo",usr_grupoSchemaJSON);

module.exports.mUsrGrupo=mUsrGrupo;