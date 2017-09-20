//modulo interno
const Perfil = require('../models/perfil');
//funciones
module.exports={
    getPerfilView:function(req,res,next){
        res.render('user/perfil');        
    },
    getPerfils:function(req,res,next){       
        Perfil.find({},(err,doc)=>{
        if(err){
            return res.status(500).send({mensaje:'error'+err});
        }else if(!perfil){
            return res.status(404).send({mensaje:'El perfil no existe'+err});
        }
        res.status(200).send({perfils:doc});
        })         
    },
    getPerfil:function(req,res,next){
        let perfilId = req.params.perfilId;        
        Perfil.find(perfilId,(err,doc)=>{
        if(err){
            return res.status(500).send({mensaje:'error'+err});
        }else if(!doc){
            return res.status(404).send({mensaje:'El perfil no existe'+err});
        }
        res.status(200).send({perfil:doc});
        })        
    },
    savePerfil:function(req,res,next){
        let perfil = new Perfil();
        perfil.usuario = req.body.usuario;
        perfil.fondo = req.body.fondo;
        perfil.avatar = req.body.avatar;
        perfil.privacidad = req.body.privacidad;
      
        perfil.save((err,doc)=>{
          if(err){
            return res.status(500).send({mensaje:'error'+err});
          }
          res.status(200).send({perfil:doc});
      
        })    
    },
    updatePerfil:function(req,res,next){
        let userId = req.params.userId;
        let update = req.body;
      
        Product.findByIdAndUpdate(userId,update,(err,docUpdated)=>{
          if(err){
            return res.status(500).send({mensaje:'error'+err});
          }
          res.status(200).send({mensaje:'el perfil ha sido actualizado'});
        });
    }
};