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

router.get('/getStory', async(req, res) =>{
    try {
        const {} = req.body;
    } catch (error) {
        console.error(error.message);
        res.status(500).json('Server Error');
    }
});

module.exports = router;