const mongoose = require('mongoose');
const permission = require('./permission');

const schema = mongoose.Schema({
    _type: String,
    _description:String,
    _status:Boolean,
    _permissions: [{
        type: mongoose.Schema.ObjectId,
        ref:'Permission'}],
});

class Profile {
    constructor(description, status, permissions, type){
        this._type = type;
        this._description = description;
        this._status = status;
        this._permissions = permissions;
    }

    get description() { return this._description; } 
    set description(v) { this._description = v; }

    get status() { return this._status; }
    set status(v) { this._status = v; }

    get permissions() {return this._permissions; }
    set permissions(v) {this._permissions = v; }

    get type() {return this._type; }
    set type(v) {this._type = v; }
}

schema.loadClass(Profile);
module.exports = mongoose.model('Profile', schema);