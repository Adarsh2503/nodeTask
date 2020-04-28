const mongoose = require('mongoose');

const User1Schema = new mongoose.Schema({
    firstname: {
        type: String
    },
    dob: {
        type: String,
    },
    phone:{
        type: String,
    },
    state: {
        type: String
    },
    zip: {
        type: String
    },
    email: {
        type:String,
        unique: true
    },
    gender: {
        type:String
    },
    userType: {
        type:String
    }
});

module.exports = User1 = mongoose.model('user1',User1Schema)