const router = require("express").Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get('/users', async(req, res) =>{
    try {

        const queryText = 'SELECT u.user_id, u.first_name, u.last_name, count(s.story_id) as story_count FROM users u left join stories s on u.user_id = s.user_id group by(u.user_id, u.first_name, u.last_name)';
        const myRes = await pool.query(queryText);
        res.json(myRes.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json('Server Error');
    }
});

module.exports = router;