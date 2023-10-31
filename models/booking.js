const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _date:Date,
    _member: {
        type: mongoose.Schema.ObjectId,
        ref: 'Member'
    },
    _copy:{
        type: mongoose.Schema.ObjectId,
        ref: 'Copy'
    }
});

class Booking {
    constructor(date, member, copy){
        this._date = date;
        this._member = member;
        this._copy = copy;
    }

    get date(){ return this._date; }
    set date(v){ this._date = v; }

    get member(){ return this._member; }
    set member(v){ this._member = v; }

    get copy(){ return this._copy; }
    set copy(v){ this._copy = v; }
}

schema.loadClass(Booking);
module.exports = mongoose.model('Booking', schema);
