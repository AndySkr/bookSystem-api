const router = require('koa-router')()
const usersController = require('../../controllers/usersController')
router.prefix('/');
router.post('/login', usersController.login);
router.post('/addUser', usersController.addUser);
module.exports = router
