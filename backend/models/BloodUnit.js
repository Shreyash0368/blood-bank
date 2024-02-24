const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BloodUnitSchema = new Schema({
    blood_type : {
        type: String,
        required: true
    },
    donor_name : {
        type: String,
        required: true
    },
    donor_id : {
        type: String,
        required: true
    },
    donor_sex : {
        type: String,
        required: true
    },
    date :{
        type: Date,
        required: true
    }    
})

module.exports = mongoose.model('BloodUnit', BloodUnitSchema);