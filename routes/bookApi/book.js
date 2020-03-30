const router = require('koa-router')();
const bookController = require('../../controllers/bookController');
router.prefix('/');
router.get('/queryAllBookList', bookController.getAllBookList);
module.exports = router;
