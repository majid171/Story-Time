const express = require("express");
const app = express();
const cors = require("cors");
const CookieParser = require('cookie-parser');
require('dotenv').config();

// middleware
app.use(express.json());
// app.use(cors());
app.use(cors({
    origin: process.env.frontendURL,
    credentials: true
}));
app.use(CookieParser());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/story', require('./routes/story'));

app.listen(5000, () =>{
    console.log("Server is running on port 5000");
});