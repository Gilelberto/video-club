const express = require('express');
const Director = require('../models/director');
const Genre = require('../models/genre');
const Actor = require('../models/actor');
const Movie = require('../models/movie');
const config = require('config');

async function create(req, res, next) {
    const title = req.body.title;
    const directorId = req.body.directorId;
    const genreId = req.body.genreId;
    const actorIds = req.body.actorIds;

    let director = await Director.findOne({ "_id": directorId });
    let genre = await Genre.findOne({ "_id": genreId });
    let actors = await Actor.find({ "_id": { $in: actorIds } });

    let movie = new Movie({
        title: title,
        director: director,
        genre: genre,
        actors: actors
    });

    movie.save().then(obj => res.status(200).json({
        message: res.__("movie.created"),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__("movie.not.created"),
        obj: ex
    }));
}

function list(req, res, next) {
    Movie.find()
        .populate("_director")
        .populate("_genre")
        .populate("_actors")
        .then(objs => res.status(200).json({
            message: res.__("movie.list"),
            objs: objs
        })).catch(ex => res.status(500).json({
            message: res.__("movie.not.list"),
            obj: ex
        }));
}

function index(req, res, next) {
    const id = req.params.id;
    Movie.findOne({ "_id": id })
        .populate(["_director", "_genre", "_actors"])
        .then(obj => res.status(200).json({
            message: res.__("movie.id") + `${id}`,
            obj: obj
        })).catch(ex => res.status(500).json({
            message: res.__("movie.not.id") + `${id}`,
            obj: ex
        }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let title = req.body.title ? req.body.title : "";
    let directorId = req.body.directorId ? req.body.directorId : "";
    let genreId = req.body.genreId ? req.body.genreId : "";
    let actorIds = req.body.actorIds ? req.body.actorIds : "";

    let movie = {
        _title: title,
        _directorId: directorId,
        _genreId: genreId,
        _actorIds: actorIds
    };

    Movie.findOneAndUpdate({ "_id": id }, movie, { new: true })
        .then(obj => res.status(200).json({
            message: res.__("movie.replace") + `${id}`,
            obj: obj
        })).catch(ex => res.status(500).json({
            message: res.__("movie.not.replace") + `${id}`,
            obj: ex
        }));
}

function update(req, res, next) {
    const id = req.params.id;
    let title = req.body.title;
    let directorId = req.body.directorId;
    let genreId = req.body.genreId;
    let actorIds = req.body.actorIds;

    let movie = {};

    if (title) movie._title = title;
    if (directorId) movie._directorId = directorId;
    if (genreId) movie._genreId = genreId;
    if (actorIds) movie._actorIds = actorIds;

    Movie.findOneAndUpdate({ "_id": id }, movie)
        .then(obj => res.status(200).json({
            message: res.__("movie.update") + `${id}`,
            obj: obj
        })).catch(ex => res.status(500).json({
            message: res.__("movie.not.update") + `${id}`,
            obj: ex
        }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Movie.findByIdAndRemove({ "_id": id })
        .then(obj => res.status(200).json({
            message: res.__("movie.destroy") + `${id}`,
            obj: obj
        })).catch(ex => res.status(500).json({
            message: res.__("movie.not.destroy") + `${id}`,
            obj: ex
        }));
}

module.exports = {
    create, list, index, replace, update, destroy
};
