const router = require("express").Router();
const authorization = require('../middleware/authorization');
const apiController = require('../controllers/api-controller');

router.get('/story', authorization, apiController.getStoryList);
router.get('/story/featured', authorization, apiController.getFeaturedStory);

router.post('/story', authorization, apiController.createStory);
router.post('/story/toggleLike', authorization, apiController.toggleLike);
router.post('/toggleFollow', authorization, apiController.toggleFollow);

router.delete('/story', authorization, apiController.deleteStory);

module.exports = router;