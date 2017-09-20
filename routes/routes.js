var express = require('express');
var router = express.Router();
const passport=require('passport');
var controllers = require('../controllers');
var AuthMiddleware = require('.././middleware/auth');

router.get('/',controllers.HomeController.index)
//rutas de usuario
router.get('/auth/signup',controllers.UserController.getSignUp);
router.post('/auth/signup',controllers.UserController.postSignUp);
router.get('/auth/signin',controllers.UserController.getSignIn);
router.post('/auth/signin',passport.authenticate('local',{
    successRedirect:'/chat/panel',
    failureRedirect:'/auth/signin',
    failureFlash:true
}));
router.get('/auth/logout',controllers.UserController.logout);
router.get('/chat/panel',AuthMiddleware.isLogged,controllers.UserController.getUserPanel);
//rutas de contacto
router.get('/contactos/agregar',AuthMiddleware.isLogged,controllers.ContactosController.getContactoView);
/*
router.get('/users/contactos',AuthMiddleware.isLogged,controllers.ContactosController.getContactoView);
router.post('/users/contactos',AuthMiddleware.isLogged,controllers.ContactosController.getContactoView);
*/
module.exports = router;
