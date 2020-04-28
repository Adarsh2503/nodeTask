const mongoose = require('mongoose');

const AgentSchema = new mongoose.Schema({
    agent: {
        type: String,
        required:true
    }
});

module.exports = Agent = mongoose.model('agent',AgentSchema);