const express = require('express');
const {Movie, Actor} = require('../db');
const director = require('../models/director');
const actor = require('../models/actor');

function create (req, res, next) {
    const title = req.body.title;
    const genreId = req.body.genreId;
    const directorId = req.body.directorId;

    Movie.create({
        title: title,
        genreId: genreId,
        directorId: directorId
    }).then(object => res.json(object))
        .catch(err => res.send(err));
}

function list (req, res, next) {
    Movie.findAll({include: ['movie_genre','movie_director','actors']})
        .then(objects => res.json(objects))
        .catch(err => res.send(err));
}

function index(req, res, next){
    const id = req.params.id;
    Movie.findByPk(id)
        .then(object => res.json(object))
        .catch(err => res.send(err));
}

function replace(req, res, next){
    const id = req.params.id;
    Movie.findByPk(id)
        .then(object => {
            const title = req.body.title ? req.body.title : "";
            const genreId = req.body.genreId ? req.body.genreId : "";
            const directorId = req.body.directorId ? req.body.directorId : "";
            object.update({
                title : title,
                genreId : genreId,
                directorId : directorId
            }).then(obj => res.json(obj))
            .catch(err => res.send(err));
        }).catch(err => res.send(err));
}

function update(req, res, next){
    const id = req.params.id;
    Movie.findByPk(id).then(object => {
        const title = req.body.title ? req.body.title : object.title;
        const genreId = req.body.genreId ? req.body.genreId : object.genreId;
        const directorId = req.body.directorId ? req.body.directorId: object.directorId;
        object.update({
            title : title,
            genreId : genreId,
            directorId : directorId 
        }).then(obj => res.json(obj)).catch(err => res.send(err));
    }).catch(err => res.send(err));
}

function destroy(req, res, next){
    const id = req.params.id;
    Movie.destroy({ where: {id: id} })
            .then(object => res.json(object))
            .catch(err => res.send(err));
}


function addActor(req,res,next){
    idMovie = req.body.idMovie;
    idActor = req.body.idActor;

    Movie.findByPk(idMovie).then(movie => {
        Actor.findByPk(idActor).then(actor => {
            movie.addActor(actor);
            res.json(movie);
        }).catch(err => res.send(err));
    }).catch(err => res.send(err));
}

module.exports = {list, index, create, replace, update, destroy, addActor};