const mongoose = require('mongoose');
const mongoosePaginated = require('mongoose-paginate-v2');

//Schema
const schema = mongoose.Schema({
    _title:String,
    _director: {
        type: mongoose.Schema.ObjectId,
        ref: 'Director'
    },
    _genre: {
        type: mongoose.Schema.ObjectId,
        ref: 'Genre'
    },
    _cast: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Actor'
    }]
});


//Clase
class Movie{
    constructor(title,director){
        this._title= title;
        this._director = director;
    }

    get title(){
        return this._title;
    }
    set title(v){
        this._title = v;
    }

    get director(){
        return this._director;
    }
    set director(v){
        this._director = v;
    }
}

//Juntar el schema con la clase
schema.loadClass(Movie);
schema.plugin(mongoosePaginated);
module.exports = mongoose.model('Movie', schema);
