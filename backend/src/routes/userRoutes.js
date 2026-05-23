const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { userAuthentication } = require("../middlewares/authMiddleware");

router.get("/", (req, res) => {
  res.send("User route working ✅");
});

router.get('/me', userAuthentication, userController.me);
router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.get('/courses', userController.getAllCourses);
router.post('/courses/:courseId', userAuthentication, userController.purchaseCourse);
router.get('/purchasedCourses', userAuthentication, userController.getPurchasedCourses);

module.exports = router;