//modulo interno
const Chat = require('../models/chat');
//funciones
module.exports={
    getChats:function(req,res,next){       
        Chat.find({},(err,doc)=>{
        if(err){
            return res.status(500).send({mensaje:'error'+err});
        }else if(!chat){
            return res.status(404).send({mensaje:'El chat no existe'+err});
        }
        res.status(200).send({chats:doc});
        })         
    },
    saveChat:function(req,res,next){
        let chat = new Chat();        
        chat.usuario = req.body.usuario;
        chat.contacto = req.body.contacto;
        chat.mensaje = req.body.mensaje;
        chat.fecha = req.body.fecha;
      
        chat.save((err,doc)=>{
          if(err){
            return res.status(500).send({mensaje:'error'+err});
          }
          res.status(200).send({chat:doc});
      
        })    
    }
};