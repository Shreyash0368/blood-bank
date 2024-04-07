const express = require('express');
const connectDB = require('./config');
const cors = require('cors')
const staffRouter = require('./routes/staffAuth');
const donorRouter = require('./routes/donorAuth');
const bloodRouter = require('./routes/blood');
const appointmentRouter = require('./routes/appointemnts');
const requestRouter = require('./routes/requests');
const roleRouter = require('./routes/role')

const app = express();
const corsOptions = {
    origin: 'http://localhost:5173'
}
app.use(express.json())
app.use(cors(corsOptions))
const port = process.env.PORT;

// connect to DB
connectDB();

app.listen(port, () => {
    console.log(`listening on port ${port}`);    
})

// handle blood-units 

// handle auth
app.use('/api/staff', staffRouter);
app.use('/api/donor', donorRouter);
app.use('/api/blood', bloodRouter);
app.use('/api/appointments', appointmentRouter);
app.use('/api/requests', requestRouter);
app.use('/api/user', roleRouter);