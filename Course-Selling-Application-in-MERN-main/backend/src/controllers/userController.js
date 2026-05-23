const User = require('../models/userModel');
const Course = require("../models/courseModel");
const jwt = require("jsonwebtoken");
const userSecret = process.env.USER_SECRET;

const generateJwtUser = (user) => {
  const payload = { username: user.username, role: "user" }; 
  return jwt.sign(payload , userSecret , { expiresIn:'24h'});
}

const userController = {
  me: (req, res) => {
    // Logic to get the current user
    return res.json({ username: req.user.username });
  },

  signUp: async (req, res) => {
    // Logic to sign up user
    const { username, password } = req.body ;
    const user = await User.findOne({ username, password }) ;
    if(user)
    {
        return res.status(403).json({ message: "User already exists" });
    }
    const newUser = new User({ username, password }) ;
    await newUser.save() ;
    const token = generateJwtUser(newUser) ;
    res.json({ message: "User created successfully." , token }) ;
  },

  login: async (req, res) => {
    // Logic to log in user
    const { username , password } = req.body ;
    const user = await User.findOne({ username, password }) ;
    if(user)
    {
        const token = generateJwtUser(user) ;
        return res.json({ message: "Logged in successfully." , token }) ;
    }
    res.status(403).json({ message: "User authentication failed."}) ;
  },

  getAllCourses: async (req, res) => {
    // Logic to list all courses
    const courses = await Course.find();
    res.json({ courses }) ;
  },

  purchaseCourse: async (req, res) => {
    // Logic to purchase a course
     try{
        const course = await Course.findById(req.params.courseId) ;
        if (!course) {
            return res.status(403).json({ message: "Course not found." });
        }
        const user = await User.findOne({ username: req.user.username }) ;
        if(user)
        {
            if(user.purchasedCourses.find((ele) => ele._id.toString() === course._id.toString()))
            {
            return res.json({ message: "You have already purchased this course." });
            }
            user.purchasedCourses.push(course) ;
            await user.save();
            return res.json({ message: "Course purchased successfully."}) ;
        }
        else{
            res.status(403).json({ message: "User not found."}) ;
        }
      }catch(err)
      {
        return res.status(500).json({ message: "Error occured while purchasing course." });
      }
  },

  getPurchasedCourses: async (req, res) => {
    // Logic to view purchased courses
    const user = await User.findOne({ username: req.user.username }).populate("purchasedCourses") ;
    if(user)
    {
        return res.json({ purchasedCourses: user.purchasedCourses || [] }) ;
    }
    res.status(403).json({ message: "User not found." }) ;
  }
};

module.exports = userController;