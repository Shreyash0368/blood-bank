const express = require('express');
const connectDB = require('./config');
const staffRouter = require('./routes/auth');
const donorRouter = require('./routes/donorAuth');

const app = express();
app.use(express.json())
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