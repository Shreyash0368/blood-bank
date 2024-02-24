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
    }
    
})

module.exports = mongoose.model('Appointment', AppointmentSchema);