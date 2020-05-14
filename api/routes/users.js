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


router.get('/:id', authorization, async(req, res) =>{
    try {
        const valid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(req.params.id);        
        if(!valid){
            res.status(404);
        }

        let myRes = await pool.query('SELECT * FROM users WHERE user_id = $1', [req.params.id]);
        
        if(!myRes.rows[0]){
            res.status(404);
        }

        

        myRes = await pool.query('SELECT u.first_name, u.last_name, count(s.story_id) as story_count FROM users u left join stories s on u.user_id = s.user_id where u.user_id = $1 group by(u.first_name, u.last_name)', [req.params.id]);
        const likes = await pool.query('SELECT COUNT(*) as likes_count FROM likes L WHERE L.user_id = $1', [req.params.id]);
        
        var response = {
            first_name: myRes.rows[0].first_name,
            last_name: myRes.rows[0].last_name,
            story_count: myRes.rows[0].story_count,
            likes_count: likes.rows[0].likes_count,
            story_list: stories.rows[0].story_list
        };

        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json('Server Error');
    }
});

module.exports = router;