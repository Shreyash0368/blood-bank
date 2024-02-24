const mongoose = require('mongoose');
const Schema = mongoose.Schema

const RequestSchema = new Schema({
    blood_type: {
        type: String,
        required: true
    },
    units : {
        type: Number,
        default: 1
    },
    staff_id: {
        type: String,
        required: true
    },
    
})

module.exports = mongoose.model('Request', RequestSchema);