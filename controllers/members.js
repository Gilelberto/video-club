const express = require('express');
const Member = require('../models/member');
const config = require('config');

function create(req, res, next) {
    let name = req.body.name;
    let lastName = req.body.lastName;
    let phone = req.body.phone;

    let address = new Object();
    address.street = req.body.street;
    address.number = req.body.number;
    address.zip = req.body.zip;
    address.city = req.body.city;
    address.state = req.body.state;
    address.country = req.body.country;

    let member = new Member({
        name: name,
        lastName: lastName,
        phone: phone,
        address: address
    });

    member.save().then(obj => res.status(200).json({
        message: res.__("member.created"),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__("member.not.created"),
        obj: ex
    }));
}

function list(req, res, next) {
    Member.find().then(objs => res.status(200).json({
        message: res.__("member.list"),
        obj: objs
    })).catch(ex => res.status(500).json({
        message: res.__("member.not.list"),
        obj: ex
    }));
}

function index(req, res, next) {
    const id = req.params.id;
    Member.findOne({ "_id": id }).then(obj => res.status(200).json({
        message: res.__("member.id") + `${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__("member.not.id") + `${id}`,
        obj: ex
    }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let lastName = req.body.lastName ? req.body.lastName : "";
    let address = req.body.address ? req.body.address : "";
    let phone = req.body.phone ? req.body.phone : "";
    let member = {
        _name: name, _lastName: lastName, _address: address, _phone: phone
    };
    Member.findOneAndUpdate({ "_id": id }, member, { new: true })
        .then(obj => res.status(200).json({
            message: res.__("member.replace") + `${id}`,
            obj: obj
        })).catch(ex => res.status(500).json({
            message: res.__("member.not.replace") + `${id}`,
            obj: ex
        }));
}

function update(req, res, next) {
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;
    let address = req.body.address;
    let phone = req.body.phone;
    let member = {};
    if (name) member._name = name;
    if (lastName) member._lastName = lastName;
    if (address) member._address = address;
    if (phone) member._phone = phone;
    Member.findOneAndUpdate({ "_id": id }, member)
        .then(obj => res.status(200).json({
            message: res.__("member.update") + `${id}`,
            obj: obj
        })).catch(ex => res.status(500).json({
            message: res.__("member.not.update") + `${id}`,
            obj: ex
        }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Member.findByIdAndRemove({ "_id": id }).then(obj => res.status(200).json({
        message: res.__("member.destroy") + `${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__("member.not.destroy") + `${id}`,
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
