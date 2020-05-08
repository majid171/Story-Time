const router = require("express").Router();
const pool = require('../db');

router.post('/createStory', async(req, res) =>{
    try {
        const {user_id, title, body} = req.body;
        
        const newDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

        await pool.query("INSERT INTO STORIES(user_id, title, body, publish_date) VALUES($1, $2, $3, $4)", 
            [user_id, title, body, newDate]);

        res.json({
            message: 'Created Story'
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json('Server Error');
    }
});

router.post('/deleteStory', async(req, res) =>{
    try {
        const {story_id, user_id} = req.body;

        const author_id = await pool.query("SELECT user_id FROM stories WHERE story_id = $1", [story_id])
        
        if(author_id.rows[0].user_id !== user_id){
            res.sendStatus(401).json('Cannot delete someone else\'s story');
        }

        await pool.query('DELETE FROM stories WHERE story_id = $1', [story_id]);

        res.json({
            message: 'Deleted Story'
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json('Server Error');
    }
});

router.get('/getStoryList', async(req, res) =>{
    try {
        const user_id = req.query.id;
        
        if(!user_id || user_id === ''){
            res.sendStatus(401).json('ID blank');
        }

        const friendIDS = await pool.query('SELECT friend_id FROM friendship WHERE user_id = $1', [user_id]);
        const result = friendIDS.rows.map(a => a.friend_id);

        let query = "SELECT s.*, u.first_name, u.last_name FROM stories s JOIN users u on u.user_id = s.user_id WHERE s.user_id IN (";

        for(var i = 0; i < result.length; i++){
            query += '\'' + result[i] + '\'';
            if(i + 1 != result.length){
                query += ',';
            }
        }
        query += ')';
        const myRes = await pool.query(query);
        const rows = myRes.rows;
        console.log(rows);

        res.json(rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json('Server Error');
    }
})

router.get('/getStory', async(req, res) =>{
    try {
        const {} = req.body;
    } catch (error) {
        console.error(error.message);
        res.status(500).json('Server Error');
    }
});

module.exports = router;