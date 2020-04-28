const mongoose = require('mongoose');

const PolicyinfoSchema = new mongoose.Schema({
    user1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user1'
    },
    company_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'policycarrier'
    },
    policy_number: {
        type: String
    },
    policy_start_date: {
        type: String,
    },
    policy_end_date:{
        type: String,
    },
    category_name: {
        type: String
    }
    
});

module.exports = Policyinfo = mongoose.model('policyinfo',PolicyinfoSchema)