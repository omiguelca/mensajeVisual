var bcrypt = require('bcryptjs')
var mongoose = require('mongoose');
const mUsers = require("../models/users").mUsers;
const mUsrGrupo = require("../models/usr_grupo").mUsrGrupo;
const mContacto = require('../models/contactos').mContacto;
const mUsrPerfil = require("../models/perfil").mPerfil;
const url = require("url");
module.exports={
    getSignUp : function(req,res,next){
        return res.render('users/signup');
    },
    postSignUp : function(req,res,next){
        var salt = bcrypt.genSaltSync(10);
        var password = bcrypt.hashSync(req.body.pass,salt);
        var bUsers={
            email:req.body.email ,
            nombre:req.body.nombre ,
            password:password 
        }
        /*aqui falta VALIDACION */
        var daoUsers = new mUsers(bUsers);
        daoUsers.save(function(){
            /*var correcto=true;
            idea para manejar transaccion:

            tener una variable boolean arrastrando y preguntar si hay error , de asi serlo,
            considerarlo en la siguiente vez que se pregunte y saltarla ,
            al final 

            dificultar : cuales procesos hermanos si se realizaron antes de fallar
            */
            /*grupos por default */
            var daoUsrGrupo= new mUsrGrupo({nombre:'Trabajo',usuario:daoUsers._id});
            daoUsrGrupo.save();
            daoUsrGrupo= new mUsrGrupo({nombre:'Escuela',usuario:daoUsers._id});
            daoUsrGrupo.save();
            daoUsrGrupo= new mUsrGrupo({nombre:'Familia',usuario:daoUsers._id});
            daoUsrGrupo.save();
            daoUsrGrupo= new mUsrGrupo({nombre:'General',usuario:daoUsers._id});
            daoUsrGrupo.save();
            /*perfil uno a uno de usuario con valores por default*/
            var daoUsrPerfil= new mUsrPerfil({
                usuario:daoUsers._id,
                fondo:'default',
                avatar:'default',
                privacidad:false
            });
        });
        //mensaje enviado a la pagina de registro
        req.flash('info','Se ha registrado correctamente, ya puede iniciar sesion')
        return res.redirect('/auth/signin');
    },
    getSignIn : function(req,res,next){
        return res.render('users/signin',{
            message:req.flash('info'),
            authmessage:req.flash('authmessage')
        });
    },getGoogle:function(req,res,next){passport.authenticate('google')},
    getGoogleCallback:function(req,res,next){
        passport.authenticate('google', { failureRedirect: '/login' }),
        function(req, res) {
          res.redirect('/');
        }
    },
    getFacebook:function(req,res,next){passport.authenticate('facebook')},
    getFacebookCallback:function(req,res,next){
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        function(req, res) {
          // Successful authentication, redirect home.
          res.redirect('/');
        }
    },
    getTwitter:function(req,res,next){passport.authenticate('twitter');},
    getTwitterCallback:function(req,res,next){
        passport.authenticate('twitter', { failureRedirect: '/login' }),
        function(req, res) {
          res.redirect('/');
        }
    }
    ,
    logout:function(req,res,next){
        req.logout();
        res.redirect('/auth/signin');
    },
    getUserPanel:function(req,res,next){  
        mUsrGrupo.find({usuario:mongoose.Types.ObjectId(req.user.usuario)},function (err,doc){
            if(err) throw err;            
            if(doc!=null){ 
                var grp=doc;
                /* poblar contacto con usr_grupo y ordenarlo  */
                mContacto.find({usuario:mongoose.Types.ObjectId(req.user.usuario)},function (err,doc){
                        if(err) throw err;            
                        //if(doc!=null){ 
                        

                           
                           // console.log(grp);
                            /*
                            mUsrGrupo.populate(doc, {path: "usr_grupo"},function(err, doc){

                            })
                            */
                            var contactos=[];
                            grp.forEach(function(ungrp){  
                                contactos=[];                            
                                doc.forEach(function(uncto){
                                    if(ungrp._id.equals(uncto.usr_grupo)){
                                        contactos.push(uncto);
                                    }
                                });
                                ungrp.contactos=contactos;
                            });
                             
                            
                            res.render('chat/panel',{
                                isAuthenticated:req.isAuthenticated(),
                                user:req.user,
                                url:'http://localhost:8080/',
                                grupos:grp
                                //falta enviar los contactos
                            });
                            //falta obtener el numero de contactos por grupo de usuario
                        /*   }*/
                   // }   
                });                      
            }
        }); 
       // res.send("No se encontro");
    }
};