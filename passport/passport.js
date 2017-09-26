const bcrypt = require('bcryptjs');
const mUsers = require("../models/users").mUsers;
const config = require("../config/auth");
var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
module.exports = function(passport){    
    passport.serializeUser(function(user,done){
        done(null,user);
    });
    passport.deserializeUser(function(obj,done){
        done(null,obj);
    });
    //passport local
    passport.use(new LocalStrategy({
        passReqToCallback:true
    }, function(req,email,password,done){
           mUsers.findOne({email:email},function(err,doc){
            if(err) throw err;            
            if(doc!=null){                
                if (bcrypt.compareSync(password,doc.password)){                      
                    return done(null,{
                        nombre:doc.nombre,
                        email:doc.email,
                        usuario:doc._id
                    });
                } 
            }            
            return done(null,false,req.flash('authmessage','Email o Password Incorrecto'));
        })       
    }))
    //passport twitter
passport.use(new TwitterStrategy({
    consumerKey: config.twitterAuth.consumerKey,
    consumerSecret: config.twitterAuth.consumerSecret,
    callbackURL: config.twitterAuth.callbackURL
  },
  function(token, tokenSecret, profile, cb) {
    User.findOrCreate({ twitterId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
  ));
  //passport google
  passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:3000/auth/google/return',
    realm: 'http://localhost:3000/'
  },
  function(identifier, done) {
    User.findByOpenID({ openId: identifier }, function (err, user) {
      return done(err, user);
    });
  }
  ));
  //passport facebook
  passport.use(new FacebookStrategy({
    clientID: config.facebookAuth.clientID,
    clientSecret: config.facebookAuth.clientSecret,
    callbackURL: config.facebookAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
  ));
}