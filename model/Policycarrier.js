const mongoose = require('mongoose');

const PolicycarrierSchema = new mongoose.Schema({
    company_name: {
        type: String,
        required:true
    }
});

module.exports = Policycarrier = mongoose.model('policycarrier',PolicycarrierSchema);