const express = require('express');
const Genre = require('../models/genre');

function create(req, res, next){
    const description = req.body.description;
    const status = req.body.status;
    let genre = new Genre({
        description:description, status:status
    });
    genre.save().then(obj => res.status(200).json({
        message:"Genero creado correctamente", 
        obj:obj
    })).catch(ex => res.status(500).json({
        message:"No se puedo almacenar el genero",
        obj:ex
    }));
}

function list(req, res, next) {
    Genre.find().then(objs => res.status(200).json({
        message:"Lista de generos",
        obj:objs
    })).catch(ex => res.status(500).json({
        message:"No se puedo consultar la lista de generos",
        obj:ex
    }));
}

function index(req, res, next){
    const id = req.params.id;
    Genre.findOne({"_id":id}).then(obj => res.status(200).json({
        message:`Genero con el id ${id}`,
        obj:obj
    })).catch(ex => res.status(500).json({
        message:`No se puedo consultar el genero con el id: ${id}`,
        obj:ex
    }));
}

function replace(req, res, next){
    const id = req.params.id;
    let description = req.body.description ? req.body.description : "";
    let status = req.body.status ? req.body.status : "";
    let genre = new Object({
        _description:description, _status:status
    });
    Genre.findOneAndUpdate({"_id":id}, genre, {new:true})
            .then(obj => res.status(200).json({
                message:`Genero reemplazado correctamente, con el id: ${id}`,
                obj:obj
            })).catch(ex => res.status(500).json({
                message:`No se puedo reemplazar el genero con el id: ${id}`,
                obj:ex
            }));
}

function update(req, res, next){
    const id = req.params.id;
    let description = req.body.description;
    let status = req.body.status;
    let genre = new Object();
    if(description) genre._description = description;
    if(status) genre._status = status;
    Genre.findOneAndUpdate({"_id":id}, genre)
            .then(obj => res.status(200).json({
                message:`Genero actualizado corretamente, con el id: ${id}`,
                obj:obj
            })).catch(ex => res.status(500).json({
                message:`No se puedo actualizar el genero con el id: ${id}`,
                obj:ex
            }));
}

function destroy(req, res, next){
    const id = req.params.id;
    Genre.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        message:`Genero eliminado correctamente, contaba con el id: ${id}`,
        obj:obj
    })).catch(ex => res.status(500).json({
        message:`No se puedo eliminar el genero con el id: ${id}`,
        obj:ex
    }));
}

module.exports = {
    create, list, index, replace, update, destroy
};