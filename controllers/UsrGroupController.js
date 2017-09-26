//modulo interno
const UsrGroup = require('../models/usr_grupo');
//funciones
module.exports={
    getUsrGroups:function(req,res,next){       
        UsrGroup.find({},(err,doc)=>{
        if(err){
            return res.status(500).send({mensaje:'error'+err});
        }else if(!grupo){
            return res.status(404).send({mensaje:'El grupo no existe'+err});
        }
        res.status(200).send({grupos:doc});
        })         
    },
    saveUsrGroup:function(req,res,next){
        /*validar no dar de alta mas de 50 grupos */
        let grupo = new UsrGroup();        
        grupo.usuario = req.user.usuario;
        grupo.nombre = req.body.nombre;
     
        grupo.save((err,doc)=>{
          if(err){
            return res.status(500).send({mensaje:'error'+err});
          }
          res.status(200).send({grupo:doc});
      
        })    
    }
};