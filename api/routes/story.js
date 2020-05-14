const router = require("express").Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.post('/createStory', authorization, async (req, res) => {
    try {
        const { userID, createdStoryTitle, createdStoryBody } = req.body;
        // console.log(createdStoryBody);

        await pool.query("INSERT INTO STORIES(user_id, title, body) VALUES($1, $2, $3)",
            [userID, createdStoryTitle, createdStoryBody]);

        res.json({
            message: 'Created Story'
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json('Server Error');
    }
});

router.post('/deleteStory', authorization, async (req, res) => {
    try {
        const { story_id, user_id } = req.body;

        const author_id = await pool.query("SELECT user_id FROM stories WHERE story_id = $1", [story_id])

        if (author_id.rows[0].user_id !== user_id) {
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

router.get('/getStoryList', authorization, async (req, res) => {
    try {
        const user_id = req.user;

        if (!user_id || user_id === '') {
            res.sendStatus(401).json('ID blank');
        }

        const friendIDS = await pool.query('SELECT friend_id FROM friendship WHERE user_id = $1', [user_id]);
        const result = friendIDS.rows.map(a => a.friend_id);

        let query = "SELECT s.*, u.first_name, u.last_name FROM stories s JOIN users u on u.user_id = s.user_id WHERE s.user_id IN (";

        for (var i = 0; i < result.length; i++) {
            query += '\'' + result[i] + '\'';
            if (i + 1 != result.length) {
                query += ',';
            }
        }
        query += ') ORDER BY s.publish_date DESC';

        const myRes = await pool.query(query);
        const rows = myRes.rows;
        res.json(rows);

    } catch (error) {
        console.error(error.message);
        res.status(500).json('Server Error');
    }
})

router.post('/toggleLike', authorization, async (req, res) => {
    try {

        const { story_id, user_id } = req.body;

        var exists = await pool.query('SELECT * FROM likes WHERE story_id = $1 AND user_id = $2', [story_id, user_id]);
        exists = exists.rows[0];

        var currentLikes = await pool.query('SELECT likes FROM stories WHERE story_id = $1', [story_id]);
        currentLikes = currentLikes.rows[0].likes;

        if (!exists) {
            await pool.query('INSERT INTO likes VALUES($1, $2)', [story_id, user_id]);
            await pool.query('UPDATE stories SET likes = $1 WHERE story_id = $2', [currentLikes + 1, story_id]);
            res.status(200).json('liked');
        }
        else {
            await pool.query('DELETE FROM likes WHERE story_id = $1 AND user_id = $2', [story_id, user_id]);
            await pool.query('UPDATE stories SET likes = $1 WHERE story_id = $2', [currentLikes - 1, story_id]);
            res.status(200).json('unliked');
        }

        

    } catch (error) {
        console.error(error);
        res.status(500).json('Server Error')
    }
});

module.exports = router;