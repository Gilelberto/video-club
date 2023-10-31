const mongoose = require('mongoose');

//Schema
const schema = mongoose.Schema({
    _description:String,
    _status:Number
});

//Clase
class Genre{
    constructor(description,status){
        this._description = description;
        this._status = status;
    }

    get description(){
        return this._description;
    }
    set description(v){
        this._description = v;
    }

    get status(){
        return this._status;
    }
    set status(v){
        this._status = v;
    }
}

//JUntar el schema con la clase
schema.loadClass(Genre);
module.exports = mongoose.model('Genre', schema);
