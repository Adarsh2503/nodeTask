const mongoose = require('mongoose');

const UseraccountSchema = new mongoose.Schema({
    account_name: {
        type: String,
    }
});

module.exports = Useraccount = mongoose.model('useraccount',UseraccountSchema);