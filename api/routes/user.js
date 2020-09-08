const router = require("express").Router();
const authorization = require('../middleware/authorization');

const userController = require('../controllers/user-controller');

router.get('/', authorization, userController.getLoggedInUser);
router.get('/users', authorization, userController.getUserList);
router.get('/:id', authorization, userController.getUserProfileByID);

module.exports = router;