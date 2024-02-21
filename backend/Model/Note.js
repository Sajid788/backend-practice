const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    name : {type:String, required:true},
    title : {type:String, required:true},
    price : {type:Number, required:true},
    rating : {type:Number, required:true, enum:[1, 2, 3, 4]},
})

const noteModel = mongoose.model('Notes', noteSchema);

module.exports = noteModel;