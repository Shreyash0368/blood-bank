const mongoose = require('mongoose');
const Schema = mongoose.Schema

const RequestSchema = new Schema({
    blood_type: {
        type: String,
        required: true
    },
    staff_id: {
        type: String,
        required: true
    },
    
})

module.exports = mongoose.model('Request', RequestSchema);