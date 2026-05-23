const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { adminAuthentication } = require('../middlewares/authMiddleware');

router.get("/", (req, res) => {
  res.send("Admin route working ✅");
});
router.get('/me', adminAuthentication, adminController.me);
router.post('/signup', adminController.signUp);
router.post('/login', adminController.login);
router.post('/courses', adminAuthentication, adminController.createCourse);
router.put('/courses/:courseId', adminAuthentication, adminController.editCourse);
router.get('/courses', adminAuthentication, adminController.getAllCourses);
router.get('/courses/:courseId', adminAuthentication, adminController.getCourseById);

module.exports = router;