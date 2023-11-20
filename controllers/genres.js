const express = require('express');
const Genre = require('../models/genre');
const config = require('config');

function create(req, res, next) {
    const description = req.body.description;
    const status = req.body.status;
    let genre = new Genre({
        description: description, status: status
    });
    genre.save().then(obj => res.status(200).json({
        message: res.__("genre.created"),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__("genre.not.created"),
        obj: ex
    }));
}

function list(req, res, next) {
    Genre.find().then(objs => res.status(200).json({
        message: res.__("genre.list"),
        obj: objs
    })).catch(ex => res.status(500).json({
        message: res.__("genre.not.list"),
        obj: ex
    }));
}

function index(req, res, next) {
    const id = req.params.id;
    Genre.findOne({ "_id": id }).then(obj => res.status(200).json({
        message: res.__("genre.id") + `${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__("genre.not.id") + `${id}`,
        obj: ex
    }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let description = req.body.description ? req.body.description : "";
    let status = req.body.status ? req.body.status : "";
    let genre = {
        _description: description, _status: status
    };
    Genre.findOneAndUpdate({ "_id": id }, genre, { new: true })
        .then(obj => res.status(200).json({
            message: res.__("genre.replace") + `${id}`,
            obj: obj
        })).catch(ex => res.status(500).json({
            message: res.__("genre.not.replace") + `${id}`,
            obj: ex
        }));
}

function update(req, res, next) {
    const id = req.params.id;
    let description = req.body.description;
    let status = req.body.status;
    let genre = {};
    if (description) genre._description = description;
    if (status) genre._status = status;
    Genre.findOneAndUpdate({ "_id": id }, genre)
        .then(obj => res.status(200).json({
            message: res.__("genre.update") + `${id}`,
            obj: obj
        })).catch(ex => res.status(500).json({
            message: res.__("genre.not.update") + `${id}`,
            obj: ex
        }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Genre.findByIdAndRemove({ "_id": id }).then(obj => res.status(200).json({
        message: res.__("genre.destroy") + `${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__("genre.not.destroy") + `${id}`,
        obj: ex
    }));
}

module.exports = {
    create, list, index, replace, update, destroy
};
