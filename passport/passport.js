const bcrypt = require('bcryptjs');
const mUsers = require("../models/users").mUsers;
var LocalStrategy = require('passport-local').Strategy;
module.exports = function(passport){
    passport.serializeUser(function(user,done){
        done(null,user);
    });
    passport.deserializeUser(function(obj,done){
        done(null,obj);
    });
    passport.use(new LocalStrategy({
        passReqToCallback:true
    }, function(req,email,password,done){
           mUsers.findOne({email:email},function(err,doc){
            if(err) throw err;            
            if(doc!=null){                
                if (bcrypt.compareSync(password,doc.password)){                      
                    return done(null,{
                        nombre:doc.nombre,
                        email:doc.email
                    });
                } 
            }            
            return done(null,false,req.flash('authmessage','Email o Password Incorrecto'));
        })       
    }))
}