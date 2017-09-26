var mongoose = require('mongoose');
//modulo interno
const Contacto = require('../models/contactos').mContacto;
const mUsrGrupo = require("../models/usr_grupo").mUsrGrupo;
//funciones
module.exports={
    getContactoView:function(req,res,next){
        mUsrGrupo.find({usuario:mongoose.Types.ObjectId(req.user.usuario)},function (err,doc){
            if(err) throw err;            
            if(doc!=null){ 
                res.render('contactos/agregar',{  
                    isAuthenticated:req.isAuthenticated(),
                    user:req.user,                  
                    grupos:doc
                });
            }   
        });   
    },
    getContactos:function(req,res,next){       
        Contacto.find({},(err,doc)=>{
        if(err){
            return res.status(500).send({mensaje:'error'+err});
        }else if(!contacto){
            return res.status(404).send({mensaje:'El contacto no existe'+err});
        }
        res.status(200).send({contactos:doc});
        })         
    },
    getContacto:function(req,res,next){
        let contactoId = req.params.contactoId;        
        Contacto.find(contactoId,(err,doc)=>{
        if(err){
            return res.status(500).send({mensaje:'error'+err});
        }else if(!doc){
            return res.status(404).send({mensaje:'El contacto no existe'+err});
        }
        res.status(200).send({contacto:doc});
        })        
    },
    saveContacto:function(req,res,next){
        let contacto = new Contacto();
        contacto.email = req.body.email;//falta comprobas si existe el email y tomar de ahi el nombre
        contacto.usuario = req.user.usuario;
        contacto.usr_grupo = req.body.usr_grupo;
        contacto.status = 0;
        contacto.falta = new Date();
      
        contacto.save((err,doc)=>{
          if(err){
            return res.status(500).send({mensaje:'error'+err});
          }
          res.status(200).send({contacto:doc});
      
        })    
    }
};