const router = require('koa-router')()
const spaceRouter = require('./bookApi/book');
const usersRouter = require('./UserApi/users')
router.get('/', async (ctx, next) => {
  ctx.body = '<h2>Hello Welcome to default !</h2>'
})
router.get('/test', async (ctx, next) => {
  ctx.body = '<h2>test !</h2>'
})
router.use('/book', spaceRouter.routes());
router.use('/users', usersRouter.routes());
module.exports = router;

