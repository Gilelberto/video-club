const mongoose = require('mongoose');
//import adminAbilities from '../abilities/adminAbilities';

const schema = mongoose.Schema({
    _name:String,
    _lastName:String,
    _email:String,
    _password:String,
    _salt:String,
    _profiles:[{
        type: mongoose.Schema.ObjectId,
        ref:'Profile'
    }]
});

class User {
    constructor(name, lastName, email, password, salt, profiles){
        this._name = name;
        this._lastName = lastName;
        this._email = email;
        this._password = password;
        this._salt = salt;
        this._profiles = profiles;
    }

    get name(){ return this._name; }
    set name(v){ this._name = v; }

    get lastName() { return this._lastName; } 
    set lastName(v) { this._lastName = v; }

    get email() { return this._email; }
    set email(v) { this._email = v; }

    get password() {return this._password; }
    set password(v) {this._password = v; }

    get salt() { return this._salt; }
    set salt(v) { this._salt = v; }

    get profiles() { return this._profiles; }
    set profiles(v) { this._profiles = v; }
}

schema.loadClass(User);
module.exports = mongoose.model('User', schema);
