const router = require('koa-router')()
const bookController = require('../../controllers/bookController')
router.prefix('/');
router.post('/queryAllBookList', bookController.getAllBookList);
module.exports = router
