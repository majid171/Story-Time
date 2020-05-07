const router = require("express").Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get('/', authorization, async(req, res) =>{
    try {
        const user = await pool.query('SELECT user_id, first_name, last_name, user_email FROM users WHERE user_id = $1', [req.user]); 
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }
});

router.post('/follow', async(req, res) =>{
    try {
        const {user_id, friend_id} = req.body;

        await pool.query('INSERT INTO friendship VALUES($1, $2)', [user_id, friend_id]);
        res.json({
            message: 'Follow Successful'
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json('Server Error');
    }
});

router.post('/unFollow', async(req, res) =>{
    try {
        const {user_id, friend_id} = req.body;

        await pool.query('DELETE FROM friendship WHERE user_id = $1 AND friend_id = $2', [user_id, friend_id]);
        res.json({
            message: 'UnFollow Successful'
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json('Server Error');
    }
});

module.exports = router;