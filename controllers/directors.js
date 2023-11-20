const express = require('express');
const Director = require('../models/director');
const config = require('config');

function create(req, res, next) {
    const name = req.body.name;
    const lastName = req.body.lastName;
    let director = new Director({
        name: name,
        lastName: lastName
    });
    director.save().then(obj => res.status(200).json({
        message: res.__("director.created"),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__("director.not.created"),
        obj: ex
    }));
}

function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;
    const options = { page: page, limit: 10 };
    Director.paginate({}, options).then(objs => res.render('directors/list', { directors: objs })).catch(ex => res.status(500).json({
        msg: res.__("director.list.error"),
        obj: ex
    }));
}

function index(req, res, next) {
    const id = req.params.id;
    Director.findOne({ "_id": id }).then(obj => res.status(200).json({
        message: res.__("director.id") + `${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__("director.not.id") + `${id}`,
        obj: ex
    }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let lastName = req.body.lastName ? req.body.lastName : "";
    let director = {
        _name: name,
        _lastName: lastName
    };
    Director.findOneAndUpdate({ "_id": id }, director, { new: true })
        .then(obj => res.status(200).json({
            message: res.__("director.replace") + `${id}`,
            obj: obj
        })).catch(ex => res.status(500).json({
            message: res.__("director.not.replace") + `${id}`,
            obj: ex
        }));
}

function update(req, res, next) {
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;
    let director = {};
    if (name) director._name = name;
    if (lastName) director._lastName = lastName;
    Director.findOneAndUpdate({ "_id": id }, director)
        .then(obj => res.status(200).json({
            message: res.__("director.update") + `${id}`,
            obj: obj
        })).catch(ex => res.status(500).json({
            message: res.__("director.not.update") + `${id}`,
            obj: ex
        }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Director.findByIdAndRemove({ "_id": id }).then(obj => res.status(200).json({
        message: res.__("director.destroy") + `${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__("director.not.destroy") + `${id}`,
        obj: ex
    }));
}

module.exports = {
    create, list, index, replace, update, destroy
};
