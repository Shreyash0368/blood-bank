const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DonorSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    blood_type : {
        type: String,
        required: true
    },    
    sex : {
        type: String,
        required: true
    },
    DOB : {
        type: Date,
        required: true
    }, 
    donations : {
        type: Array,
        default: []
    }    
})

module.exports = mongoose.model('Donor', DonorSchema);