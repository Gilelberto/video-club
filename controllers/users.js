const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { createAdminProfile, createUserProfile } = require('../models/utils/definePermissions');
const config = require('config');

async function create(req, res, next) {
    const name = req.body.name;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    let salt = await bcrypt.genSalt(10);
    let profile = req.body.profile;
    let profileId;

    if (profile === 'admin') {
        profileId = await createAdminProfile();
    }
    if (profile === 'user') {
        profileId = await createUserProfile();
    }

    const passwordHash = await bcrypt.hash(password, salt);

    let user = new User({
        name: name, lastName: lastName, email: email, password: passwordHash, salt: salt, profiles: [profileId]
    });

    user.save().then(obj => res.status(200).json({
        message: res.__("user.created"),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__("user.not.created"),
        obj: ex
    }));
}

function list(req, res, next) {
    User.find().then(objs => res.status(200).json({
        message: res.__("user.list"),
        obj: objs
    })).catch(ex => res.status(500).json({
        message: res.__("user.not.list"),
        obj: ex
    }));
}

function index(req, res, next) {
    const id = req.params.id;
    User.findOne({ "_id": id }).then(obj => res.status(200).json({
        message: res.__("user.id") + `${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__("user.not.id") + `${id}`,
        obj: ex
    }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let lastName = req.body.lastName ? req.body.lastName : "";
    let email = req.body.email ? req.body.email : "";
    let password = req.body.password ? req.body.password : "";

    let user = {
        _name: name, _lastName: lastName, _email: email, _password: password
    };

    User.findOneAndUpdate({ "_id": id }, user, { new: true })
        .then(obj => res.status(200).json({
            message: res.__("user.replace") + `${id}`,
            obj: obj
        })).catch(ex => res.status(500).json({
            message: res.__("user.not.replace") + `${id}`,
            obj: ex
        }));
}

function update(req, res, next) {
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;

    let user = {};

    if (name) user._name = name;
    if (lastName) user._lastName = lastName;
    if (email) user._email = email;
    if (password) user._password = password;

    User.findOneAndUpdate({ "_id": id }, user)
        .then(obj => res.status(200).json({
            message: res.__("user.update") + `${id}`,
            obj: obj
        })).catch(ex => res.status(500).json({
            message: res.__("user.not.update") + `${id}`,
            obj: ex
        }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    User.findByIdAndRemove({ "_id": id })
        .then(obj => res.status(200).json({
            message: res.__("user.destroy") + `${id}`,
            obj: obj
        })).catch(ex => res.status(500).json({
            message: res.__("user.not.destroy") + `${id}`,
            obj: ex
        }));
}

module.exports = {
    create, list, index, replace, update, destroy
};
