const router = require("express").Router();
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization');

const authController = require('../controllers/auth-controller');

router.post('/login', validInfo, authController.login);
router.post('/register', validInfo, authController.register);
router.get('/logout', authorization, authController.logout);
router.get('/is-verify', authorization, authController.verify);

module.exports = router;