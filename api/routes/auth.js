const router = require("express").Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization');

router.post("/register", validInfo, async(req, res) =>{
    try{
        const { first_name, last_name, email, password } = req.body;
        
        const user = await pool.query("SELECT 1 FROM users WHERE user_email = $1", [email]);

        if(user.rows.length != 0){
            return res.status(401).send("User already exists");
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const securePassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query("INSERT INTO users(first_name, last_name, user_email, user_password) VALUES($1, $2, $3, $4) RETURNING *",
            [first_name, last_name, email, securePassword]
        );

        const token = jwtGenerator(newUser.rows[0].user_id);

        res.json({token});

    }catch(err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

router.post('/login', validInfo, async(req, res) =>{
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

        res.json({
            token
        });

    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/is-verify', authorization, async(req, res) =>{
    try {
        res.json(true);
    }catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;