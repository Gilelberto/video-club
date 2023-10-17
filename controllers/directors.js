const express = require('express');
const Director = require('../models/director');


function create (req, res, next) {
    const name = req.body.name;
    const lastName = req.body.lastName;
    
    let Director = new Director({
        name:name,
        lastName:lastName
    });
}

function list (req, res, next) {
    res.send('Directors list');
}

function index (req, res, next) {
    res.send('Directors index');
}


function replace (req, res, next) {
    res.send('Directors replace');
}

function update (req, res, next) {
    res.send('Directors update');
}

function destroy (req, res, next) {
    res.send('Directors destroy');
}

module.exports = {list, index, create, replace, update, destroy};