const router = require("koa-router")();
const CourseController = require('../../controllers/courseController')
router.get('/lastLearn', CourseController.lastLearn)
router.get('/courseList', CourseController.queryCourseList)
module.exports = router