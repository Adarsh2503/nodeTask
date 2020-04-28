const mongoose = require('mongoose');

const policycategorySchema = new mongoose.Schema({
    category_name: {
        type: String
    }
});

module.exports = Policycategory = mongoose.model('policycategory',policycategorySchema);