const express = require('express');
const AwaitList = require('../models/awaitList');
const Movie = require('../models/movie');
const Member = require('../models/member');
const config = require('config');

async function create(req, res, next) {
    const memberId = req.body.memberId;
    const movieId = req.body.movieId;

    let member = await Member.findOne({ "_id": memberId });
    let movie = await Movie.findOne({ "_id": movieId });

    let awaitList = new AwaitList({
        member: member,
        movie: movie,
    });

    awaitList.save().then(obj => res.status(200).json({
        msg: res.__("awaitList.created"),
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__("awaitList.not.created"),
        obj: ex
    }));
}

function list(req, res, next) {
    AwaitList.find()
        .populate(["_member", "_movie"])
        .then(objs => res.status(200).json({
            msg: res.__("awaitList.list"),
            objs: objs
        })).catch(ex => res.status(500).json({
            message: res.__("awaitList.not.list"),
            obj: ex
        }));
}

function index(req, res, next) {
    const id = req.params.id;
    AwaitList.findOne({ "_id": id })
        .populate(["_member", "_movie"])
        .then(obj => res.status(200).json({
            message: res.__("awaitList.id") + `${id}`,
            obj: obj
        })).catch(ex => res.status(500).json({
            message: res.__("awaitList.not.id") + `${id}`,
            obj: ex
        }));
}

function replace(req, res, next) {
    const id = req.params.id;
    const memberId = req.body.memberId ? req.body.memberId : "";
    const movieId = req.body.movieId ? req.body.movieId : "";

    let awaitList = {
        memberId: memberId,
        movieId: movieId
    };

    AwaitList.findOneAndUpdate({ "_id": id }, awaitList, { new: true })
        .then(obj => res.status(200).json({
            msg: res.__("awaitList.replace") + `${id}`,
            obj: obj
        })).catch(ex => res.status(500).json({
            message: res.__("awaitList.not.replace") + `${id}`,
            obj: ex
        }));
}

function update(req, res, next) {
    const id = req.params.id;
    let memberId = req.body.memberId;
    let movieId = req.body.movieId;
    let awaitList = {};
    if (memberId) awaitList._member = memberId;
    if (movieId) awaitList._movie = movieId;
    AwaitList.findOneAndUpdate({ "_id": id }, awaitList)
        .then(obj => res.status(200).json({
            message: res.__("awaitList.update") + `${id}`,
            obj: obj
        })).catch(ex => res.status(500).json({
            message: res.__("awaitList.not.update") + `${id}`,
            obj: ex
        }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    AwaitList.findByIdAndRemove({ "_id": id }).then(obj => res.status(200).json({
        message: res.__("awaitList.destroy") + `${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__("awaitList.not.destroy") + `${id}`,
        obj: ex
    }));
}

module.exports = {
    create, list, index, replace, update, destroy
};
