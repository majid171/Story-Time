const router = require("express").Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get('/', authorization, async(req, res) =>{
    try {

        const queryText = 'SELECT u.user_id, u.first_name, u.last_name, count(s.story_id) as story_count FROM users u left join stories s on u.user_id = s.user_id group by(u.user_id, u.first_name, u.last_name)';
        const myRes = await pool.query(queryText);
        res.json(myRes.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json('Server Error');
    }
});


router.get('/:id', async(req, res) =>{
    try {

        const valid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(req.params.id);        
        if(!valid){
            res.status(404);
        }

        const myRes = await pool.query('SELECT * FROM users WHERE user_id = $1', [req.params.id]);
        
        if(!myRes.rows[0]){
            res.status(404);
        }

        res.status(200).json('ok');
    } catch (error) {
        console.error(error.message);
        res.status(500).json('Server Error');
    }
});

module.exports = router;