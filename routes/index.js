const router = require('koa-router')()
const spaceRouter = require('./bookApi/book');
const userRouter = require('./UserApi/user');
const courserRouter = require('./courseApi/course');
router.get('/', async (ctx, next) => {
  ctx.body = '<h2>Hello Welcome to default !</h2>'
})
router.get('/test', async (ctx, next) => {
  ctx.body = '<h2>test !</h2>'
})
router.use('/book', spaceRouter.routes());
router.use('/user', userRouter.routes());
router.use('/course', courserRouter.routes());
module.exports = router;

