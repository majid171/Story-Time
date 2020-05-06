const express = require("express");
const app = express();
const cors = require("cors");
const CookieParser = require('cookie-parser');

// middleware
app.use(express.json());
// app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(CookieParser());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/dashboard', require('./routes/dashboard'));

app.listen(5000, () =>{
    console.log("Server is running on port 5000");
});