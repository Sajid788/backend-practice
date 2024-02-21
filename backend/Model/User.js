const mongoose = require('mongoose');

const usreSchema = new mongoose.Schema({
    name : {type: String, required : true},
    email : {type: String, required : true},
    password : {type: String, required : true}
})


const userModel = mongoose.model('Users', usreSchema);

module.exports = userModel