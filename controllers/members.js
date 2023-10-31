const express = require('express');
const Member = require('../models/member');

function create(req, res, next){
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

    member.save().then(obj => res.status(200).json(obj)).catch(
        ex => res.staus(500).json({
            msg: "No se pudo almacenar el socio",
            obj: ex
        })
    );


}

function list(req, res, next) {
    Member.find().then(objs => res.status(200).json({
        message:"Lista de member",
        obj:objs
    })).catch(ex => res.status(500).json({
        message:"No se puedo consultar la lista de miembros",
        obj:ex
    }));
}

function index(req, res, next){
    const id = req.params.id;
    Member.findOne({"_id":id}).then(obj => res.status(200).json({
        message:`Miembro con el id ${id}`,
        obj:obj
    })).catch(ex => res.status(500).json({
        message:`No se puedo consultar el miembro con el id: ${id}`,
        obj:ex
    }));
}

function replace(req, res, next){
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let lastName = req.body.lastName ? req.body.lastName : "";
    let address = req.body.address ? req.body.address : "";
    let phone = req.body.phone ? req.body.phone : "";
    let member = new Object({
        _name:name, _lastName:lastName, _address:address, _phone:phone
    });
    Member.findOneAndUpdate({"_id":id}, member, {new:true})
            .then(obj => res.status(200).json({
                message:`Miembro reemplazado correctamente, con el id: ${id}`,
                obj:obj
            })).catch(ex => res.status(500).json({
                message:`No se puedo reemplazar el miembro con el id: ${id}`,
                obj:ex
            }));
}

function update(req, res, next){
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;
    let address = req.body.address;
    let phone = req.body.phone;
    let member = new Object();
    if(name) member._name = name;
    if(lastName) member._lastName = lastName;
    if(address) member._address = address;
    if(phone) member._phone = phone;
    Member.findOneAndUpdate({"_id":id}, member)
            .then(obj => res.status(200).json({
                message:`Miembro actualizado corretamente, con el id: ${id}`,
                obj:obj
            })).catch(ex => res.status(500).json({
                message:`No se pudo actualizar el miembro con el id: ${id}`,
                obj:ex
            }));
}

function destroy(req, res, next){
    const id = req.params.id;
    Member.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        message:`Miembro eliminado correctamente, contaba con el id: ${id}`,
        obj:obj
    })).catch(ex => res.status(500).json({
        message:`No se puedo eliminar el miembro con el id: ${id}`,
        obj:ex
    }));
}

module.exports = {
    create, list, index, replace, update, destroy
};
