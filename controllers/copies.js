const express = require('express');
const Copy = require('../models/copy');
const Movie = require('../models/movie');
const config = require('config');

async function create(req, res, next) {
    const number = req.body.number;
    const format = req.body.format;
    const movieId = req.body.movieId;
    const status = req.body.status;

    let movie = await Movie.findOne({ "_id": movieId });

    let copy = new Copy({
        number: number,
        format: format,
        movie: movie,
        status: status
    });

    copy.save().then(obj => res.status(200).json({
        msg: res.__("copy.created"),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__("copy.not.created"),
        obj: ex
    }));
}

function list(req, res, next) {
    Copy.find().populate("_movie")
        .then(objs => res.status(200).json({
            msg: res.__("copy.list"),
            objs: objs
        })).catch(ex => res.status(500).json({
            message: res.__("copy.not.list"),
            obj: ex
        }));
}

function index(req, res, next) {
    const id = req.params.id;
    Copy.findOne({ "_id": id })
        .populate("_movie")
        .then(obj => res.status(200).json({
            message: res.__("copy.id") + `${id}`,
            obj: obj
        })).catch(ex => res.status(500).json({
            message: res.__("copy.not.id") + `${id}`,
            obj: ex
        }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let number = req.body.number ? req.body.number : "";
    let format = req.body.format ? req.body.format : "";
    let movieId = req.body.movieId ? req.body.movieId : "";
    let status = req.body.status ? req.body.status : "";

    let copy = {
        _number: number,
        _format: format,
        _movieId: movieId,
        _status: status
    };

    Copy.findOneAndUpdate({ "_id": id }, copy, { new: true })
        .then(obj => res.status(200).json({
            message: res.__("copy.replace") + `${id}`,
            obj: obj
        })).catch(ex => res.status(500).json({
            message: res.__("copy.not.replace") + `${id}`,
            obj: ex
        }));
}

function update(req, res, next) {
    const id = req.params.id;
    let number = req.body.number;
    let format = req.body.format;
    let movieId = req.body.movieId;
    let status = req.body.status;

    let copy = {};
    
    if (number) copy._number = number;
    if (format) copy._format = format;
    if (movieId) copy._movie = movieId;
    if (status) copy._status = status;
    
    Copy.findOneAndUpdate({ "_id": id }, copy)
        .then(obj => res.status(200).json({
            message: res.__("copy.update") + `${id}`,
            obj: obj
        })).catch(ex => res.status(500).json({
            message: res.__("copy.not.update") + `${id}`,
            obj: ex
        }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Copy.findByIdAndRemove({ "_id": id })
        .then(obj => res.status(200).json({
            message: res.__("copy.destroy") + `${id}`,
            obj: obj
        })).catch(ex => res.status(500).json({
            message: res.__("copy.not.destroy") + `${id}`,
            obj: ex
        }));
}

module.exports = {
    list,
    index,
    create,
    replace,
    update,
    destroy
};


