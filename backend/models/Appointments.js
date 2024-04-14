const mongoose = require('mongoose');
const Schema = mongoose.Schema

const AppointmentSchema = new Schema({    
    date : {
        type: Date,        
    },
    donor_id: {
        type: String,
        required: true
    },
    donor_name: {
        type: String
    },
    units: {
        type: Number,
        default: 1

    },
    blood_type: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    }
    
})

module.exports = mongoose.model('Appointment', AppointmentSchema);