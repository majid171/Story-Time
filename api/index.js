const express = require("express");
const app = express();
const cors = require("cors");
const CookieParser = require('cookie-parser');
const routes = {
    auth: require('./routes/auth'),
    api: require('./routes/api'),
    user: require('./routes/user')
}

require('dotenv').config();

app.use(express.json());
app.use(cors({
    origin: process.env.frontendURL,
    credentials: true
}));
app.use(CookieParser());

// Routes
app.use('/auth', routes.auth);
app.use('/api', routes.api);
app.use('/u', routes.user);
// app.use('/u', require('./routes/users'));
// app.use('/dashboard', require('./routes/dashboard'));
// app.use('/story', require('./routes/story'));

app.listen(5000, () =>{
    console.log("Server is running on port 5000");
});