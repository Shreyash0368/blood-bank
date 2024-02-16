const express = require('express');
const connectDB = require('./config');

const app = express();
const port = process.env.PORT;

// connect to DB
connectDB();

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})