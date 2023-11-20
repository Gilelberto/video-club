const express = require('express');
const Actor = require('../models/actor');
const config = require('config');

function create(req, res, next) {
    const name = req.body.name;
    const lastName = req.body.lastName;
    let actor = new Actor({
        name: name,
        lastName: lastName
    });
    actor.save().then(obj => res.status(200).json({
        message: res.__("actor.created"),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__("actor.not.created"),
        obj: ex
    }));
}

function list(req, res, next) {
    Actor.find().then(objs => res.status(200).json({
        message: res.__("actor.list"),
        obj: objs
    })).catch(ex => res.status(500).json({
        message: res.__("actor.not.list"),
        obj: ex
    }));
}

function index(req, res, next) {
    const id = req.params.id;
    Actor.findOne({ "_id": id }).then(obj => res.status(200).json({
        message: res.__("actor.id") + `${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__("actor.not.id") + `${id}`,
        obj: ex
    }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let lastName = req.body.lastName ? req.body.lastName : "";
    let actor = {
        _name: name,
        _lastName: lastName
    };
    Actor.findOneAndUpdate({ "_id": id }, actor, { new: true })
        .then(obj => res.status(200).json({
            message: res.__("actor.replace") + `${id}`,
            obj: obj
        })).catch(ex => res.status(500).json({
            message: res.__("actor.not.replace") + `${id}`,
            obj: ex
        }));
}

function update(req, res, next) {
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;
    let actor = {};
    if (name) actor._name = name;
    if (lastName) actor._lastName = lastName;
    Actor.findOneAndUpdate({ "_id": id }, actor)
        .then(obj => res.status(200).json({
            message: res.__("actor.update") + `${id}`,
            obj: obj
        })).catch(ex => res.status(500).json({
            message: res.__("actor.not.update") + `${id}`,
            obj: ex
        }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Actor.findByIdAndRemove({ "_id": id }).then(obj => res.status(200).json({
        message: res.__("actor.destroy") + `${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__("actor.not.destroy") + `${id}`,
        obj: ex
    }));
}

module.exports = {
    create, list, index, replace, update, destroy
};
