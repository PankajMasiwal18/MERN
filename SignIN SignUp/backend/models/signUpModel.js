const mongoose = require('mongoose');

var signUp_model = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

module.exports = mongoose.model('SignUpDetails', signUp_model);
