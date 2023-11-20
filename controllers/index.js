const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User  = require('../models/user');
const config = require('config');

function home (req, res, next) {
    res.render('index', { title: 'Express' }); 
}

function login(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const JwtKey = config.get("secret.key");
    User.findOne({"_email":email}).then(user => {
        if(user){
            bcrypt.hash(password, user.salt, (err, hash) => {
                if(err){
                    res.status(403).json({
                        message: res.__("login.wrong"), //__ es una variable de entorno
                        obj:err
                    });
                }
                if(hash === user.password){
                    res.status(200).json({
                        message: res.__("login.ok"),
                        obj: jwt.sign({data:user.data, exp:Math.floor(Date.now()/1000) + 1000}, JwtKey)
                    });
                } else {
                    res.status(403).json({
                        message: res.__("login.wrong"),
                        obj:null
                    }); 
                }
            });
        } else {
            res.status(403).json({
                message: res.__("login.wrong"),
                obj:null
            });
        }
    }).catch(ex => res.status(403).json({
        message: res.__("login.wrong"),
        obj:ex
    }));
}

module.exports = {home, login}
