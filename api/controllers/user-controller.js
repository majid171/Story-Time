const pool = require('../db');

exports.getLoggedInUser = async (req, res, next) => {
    try {
        const user = await pool.query("SELECT user_id, first_name, last_name, user_email FROM users WHERE user_id = $1", [req.user]);
        res.status(200).json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }
};

exports.getUserList = async (req, res, next) => {
    try {
        const queryText = 'SELECT u.user_id, u.first_name, u.last_name, count(s.story_id) as story_count FROM users u left join stories s on u.user_id = s.user_id group by(u.user_id, u.first_name, u.last_name)';
        const myRes = await pool.query(queryText);
        res.json(myRes.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json('Server Error');
    }
};

exports.getUserProfileByID = async (req, res, next) => {
    try {
        const id = req.params.id;

        const valid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
        if (!valid) {
            res.status(404);
        }

        let myRes = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);

        if (!myRes.rows[0]) {
            res.status(404);
        }

        var response = {};
        response.logged_user_id = req.user;

        myRes = await pool.query('SELECT u.first_name, u.last_name, u.created_date, count(s.story_id) as story_count FROM users u left join stories s on u.user_id = s.user_id where u.user_id = $1 group by(u.first_name, u.last_name, u.created_date)', [id]);
        response.first_name = myRes.rows[0].first_name;
        response.last_name = myRes.rows[0].last_name;
        response.story_count = myRes.rows[0].story_count;
        response.created_date = myRes.rows[0].created_date;

        myRes = await pool.query('SELECT * FROM friendship WHERE user_id = $1 AND friend_id = $2', [req.user, id]);
        response.doesFollow = myRes.rows[0] ? true : false;

        myRes = await pool.query('SELECT f.friend_id, u.first_name, u.last_name from friendship f join users u on f.friend_id = u.user_id where f.user_id = $1', [id]);
        response.following = myRes.rows;

        myRes = await pool.query('SELECT f.user_id, u.first_name, u.last_name from friendship f join users u on u.user_id = f.user_id where f.friend_id = $1', [id]);
        response.followers = myRes.rows;

        myRes = await pool.query('select u.first_name, u.last_name, s.story_id, s.title, s.body, s.publish_date, s.likes from users u join stories s on u.user_id = s.user_id where u.user_id = $1', [id]);
        response.story_list = myRes.rows;

        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json('Server Error');
    }
}