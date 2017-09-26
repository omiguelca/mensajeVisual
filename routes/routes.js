var express = require('express');
var router = express.Router();
const passport=require('passport');
var controllers = require('../controllers');
var AuthMiddleware = require('.././middleware/auth');

router.get('/',controllers.HomeController.index)
//rutas de usuario
router.get('/auth/signup',controllers.UserController.getSignUp);
router.post('/auth/signup',controllers.UserController.postSignUp);
//auth twitter
router.get('/auth/twitter',controllers.UserController.getTwitter);
router.get('/auth/twitter/callback', controllers.UserController.getTwitterCallback);
//auth google
router.get('/auth/google',controllers.UserController.getGoogle);
router.get('/auth/google/return', controllers.UserController.getGoogleCallback);
//auth facebook
router.get('/auth/facebook',controllers.UserController.getFacebook);
router.get('/auth/facebook/callback',controllers.UserController.getFacebookCallback);
//auth local
router.get('/auth/signin',controllers.UserController.getSignIn);//(falta)si ya esta iniciada enviar directo al chat
router.post('/auth/signin',passport.authenticate('local',{
    successRedirect: '/chat/panel',
    failureRedirect:'/auth/signin',
    failureFlash:true
}));
router.get('/auth/logout',controllers.UserController.logout);
router.get('/chat/panel',AuthMiddleware.isLogged,controllers.UserController.getUserPanel);
//rutas de contacto
router.get('/contactos/agregar',AuthMiddleware.isLogged,controllers.ContactosController.getContactoView);
router.post('/contactos/agregar',AuthMiddleware.isLogged,controllers.ContactosController.saveContacto);
/*
router.get('/users/contactos',AuthMiddleware.isLogged,controllers.ContactosController.getContactoView);
router.post('/users/contactos',AuthMiddleware.isLogged,controllers.ContactosController.getContactoView);
*/
module.exports = router;
