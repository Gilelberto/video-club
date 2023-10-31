const express = require('express');
const Director = require('../models/director');


function create (req, res, next) {
    const name = req.body.name;
    const lastName = req.body.lastName;
    
    let director = new Director({
        name:name,
        lastName:lastName
    });

    director.save().then(obj => res.status(200).json({
        msg: "Director correctly created",
        obj: obj

    })).catch(ex => res.status(500).json({
        msg:"Unable to storage the Director",
        obj:ex
    }));
}

function list (req, res, next) {
    let page = req.params.page? req.params.page: 1;
    const options = {
        page: page,
        limit: 5
    }
    Director.paginate({},options).then(objs => res.status(200).json({ //si quiero la lista sería objs.obj.docs
        msg: "Directors list",
        obj:objs
    })).catch(ex => res.status(500).json({
        msg: "Unable to get the information",
        obj:ex
    }));
}

function index (req, res, next) {
    const id = req.params.id;
    Director.findOne({"_id":id}).then(obj => res.status(200).json({
        msg: "Director found",
        obj:obj
    })).catch(ex => res.status(500).json({
        msg: `Unable to find the director with the specified id: ${id}`,
        obj:ex
    }));
}


function replace (req, res, next) {
    const id = req.params.id;
    let name = req.body.name ? req.body.name: "";
    let lastName = req.body.lastName ? req.body.lastName: "";

    //objeto porque es el que va a reemplazar al que está
    let director = new Object({
        _name : name,
        _lastName: lastName
    });

    //id, objeto que se va a poner, parámetros de configuración   //el new:true es si no existe lo crea
    Director.findByIdAndUpdate({"_id":id}, director, {new: true}).then(obj => res.status(200).json({
        msg: "Director replaced correctly",
        obj:obj
    })).catch(ex => res.status(500).json({
        msg:"Unable to replace Director",
        obj: ex
    }));
}

function update (req, res, next) {
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;

    //objeto porque es el que va a reemplazar al que está
    let director = new Object();

    if(name) director._name = name;
    if(lastName) director._lastName = lastName;

    //id, objeto que se va a poner, parámetros de configuración   //el new:true no pq es actualizar o sea ya existe
    Director.findByIdAndUpdate({"_id":id}, director).then(obj => res.status(200).json({
        msg: "Director updated correctly",
        obj:obj
    })).catch(ex => res.status(500).json({
        msg:"Unable to update Director",
        obj: ex
    }));
}

function destroy (req, res, next) {
    const id = req.params.id;

    //este método te valida el objeto.
    Director.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        msg: `Director correctly eliminated. Id: ${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "Unable to delete the specified director with",
        obj: ex
    }));
}

module.exports = {list, index, create, replace, update, destroy};