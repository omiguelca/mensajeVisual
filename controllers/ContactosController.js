//modulo interno
const Contacto = require('../models/contactos');
//funciones
module.exports={
    getContactoView:function(req,res,next){
        res.render('contactos/agregar');        
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
        contacto.nombre = req.body.nombre;
        contacto.usuario = req.body.usuario;
        contacto.usr_grupo = req.body.usr_grupo;
        contacto.status = req.body.status;
        contacto.falta = req.body.falta;
      
        contacto.save((err,doc)=>{
          if(err){
            return res.status(500).send({mensaje:'error'+err});
          }
          res.status(200).send({contacto:doc});
      
        })    
    }
};