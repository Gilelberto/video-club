const express = require('express');
const User = require('../models/user');

function create(req, res, next){
    const name = req.body.name;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    let user = new User({
        name:name, lastName:lastName, email:email, password:password
    });
    user.save().then(obj => res.status(200).json({
        message:"Usuario creado correctamente", 
        obj:obj
    })).catch(ex => res.status(500).json({
        message:"No se puedo almacenar el usuario",
        obj:ex
    }));
}

function list(req, res, next) {
    User.find().then(objs => res.status(200).json({
        message:"Lista de usuarios",
        obj:objs
    })).catch(ex => res.status(500).json({
        message:"No se puedo consultar la lista de usuarios",
        obj:ex
    }));
}

function index(req, res, next){
    const id = req.params.id;
    User.findOne({"_id":id}).then(obj => res.status(200).json({
        message:`Usuario con el id ${id}`,
        obj:obj
    })).catch(ex => res.status(500).json({
        message:`No se puedo consultar el usuario con el id: ${id}`,
        obj:ex
    }));
}

function replace(req, res, next){
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let lastName = req.body.lastName ? req.body.lastName : "";
    let email = req.body.email ? req.body.email : "";
    let password = req.body.password ? req.body.password : "";
    let user = new Object({
        _name:name, _lastName:lastName, _email:email, _password:password
    });
    User.findOneAndUpdate({"_id":id}, user, {new:true})
            .then(obj => res.status(200).json({
                message:`Usuario reemplazado correctamente, con el id: ${id}`,
                obj:obj
            })).catch(ex => res.status(500).json({
                message:`No se puedo reemplazar el usuario con el id: ${id}`,
                obj:ex
            }));
}

function update(req, res, next){
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;
    let user = new Object();
    if(name) user._name = name;
    if(lastName) user._lastName = lastName;
    if(email) user._email = email;
    if(password) user._password = password;
    User.findOneAndUpdate({"_id":id}, user)
            .then(obj => res.status(200).json({
                message:`Usuario actualizado corretamente, con el id: ${id}`,
                obj:obj
            })).catch(ex => res.status(500).json({
                message:`No se puedo actualizar el usuario con el id: ${id}`,
                obj:ex
            }));
}

function destroy(req, res, next){
    const id = req.params.id;
    User.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        message:`Usuario eliminado correctamente, contaba con el id: ${id}`,
        obj:obj
    })).catch(ex => res.status(500).json({
        message:`No se puedo eliminar el usuario con el id: ${id}`,
        obj:ex
    }));
}

module.exports = {
    create, list, index, replace, update, destroy
};
