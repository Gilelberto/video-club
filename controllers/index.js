const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


function home(req,res,next){
    res.render('index', { title: 'Express' });
};

function login(req,res,next){
    const JwtKey = "463340bc6da8a098337c344e22ae8029";
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({"_email":email}).then( user => {
        if(user){
            bcrypt.hash(password,user.saltKey, (err,hash)=>{
                if(err){
                    res.status(403).json({
                        msg:"Usuario y contraseña incorrecto",
                        obj: {}
                    });
                }
                if(hash === user.password){
                    res.status(200).json({
                        msg: "Login exitoso",                           //obtener segundos, le sumammos el tiempo en segundos para que el token expire
                        obj: jwt.sign({data:user.data, exp: Math.floor(Date.now()/1000)+120},JwtKey)
                    });
                }
                else{
                    res.status(403).json({
                        msg:"Usuario y/o contraseña incorrecto",
                        obj: {}
                    });
                }
            });
        }else{
            res.status(403).json({
                msg:"Usuario y/o contraseña incorrecto",
                obj: {}
            });
        }
    }).catch(ex => res.status(403).json({
        msg:"Usuario y/o contraseña incorrecto",
        obj: {}
    }));


};

module.exports = {home,login}