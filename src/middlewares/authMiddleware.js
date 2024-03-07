const express = require('express');
const session = require('express-session');

//const firebaseAdmin = require('../config/firebase');

function verificarSesion(req, res, next){
    if(!req.session.user){
    res.redirect('/');
    }
    else{
      req.session.user = {
        email:req.session.user.email,
        uid: req.session.user.uid,
    };
    next();
    }
}
 

module.exports = {
  verificarSesion
};
