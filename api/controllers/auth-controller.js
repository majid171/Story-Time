const bcrypt = require('bcrypt');
const pool = require('../db');
const jwtGenerator = require('../utils/jwtGenerator');

exports.login = async(req, res, next) => {
    try{

        const { email, password } = req.body;

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

        if(user.rows.length === 0){
            return res.status(401).json('Email or password is incorrect');
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
        
        if(!validPassword){
            return res.status(401).json('Email or password is incorrect');
        }
        
        const token = jwtGenerator(user.rows[0].user_id);
        
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 10*365*24*60*60*1000,
        });
        res.status(200).json(user);
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
};

exports.register = async(req, res, next) =>{
    try{
        const { first_name, last_name, email, password } = req.body;
        
        const user = await pool.query("SELECT 1 FROM users WHERE user_email = $1", [email]);

        if(user.rows.length != 0){
            return res.status(401).json("User already exists");
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const securePassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query("INSERT INTO users(first_name, last_name, user_email, user_password) VALUES($1, $2, $3, $4) RETURNING *",
            [first_name, last_name, email, securePassword]
        );

        const token = jwtGenerator(newUser.rows[0].user_id);
        
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 10*365*24*60*60*1000,
        });
        res.status(200).json(newUser);
    }catch(err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
};

exports.logout = async(req, res, next) => {
    res.clearCookie('token');
    res.json({
        message: 'Logged Out'
    });
};

exports.verify = async(req,res,next) => {
    try {
        res.json(true);
    }catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
};