const Admin = require("../models/adminModel");
const Course = require("../models/courseModel");
const jwt = require("jsonwebtoken");
const adminSecret = process.env.ADMIN_SECRET;

const generateJwtAdmin = (admin) => {
    const payload = { username: admin.username, role: "admin" }; 
    return jwt.sign(payload , adminSecret , { expiresIn:'24h'});
  }
  
  const adminController = {
    me: (req, res) => {
       // Logic to get the current admin 
       return res.json({ username: req.admin.username });
    },

    signUp: async (req, res) => {
      // Logic to sign up admin
      const { username, password } = req.body;
      try {
        const admin = await Admin.findOne({ username });
        if (admin) {
          return res.status(403).json({ message: 'Admin already exists' });
        }
        const newAdmin = new Admin({ username, password });
        await newAdmin.save();
        const token = generateJwtAdmin(newAdmin);
        res.json({ message: "Admin created successfully.", token });
      } catch (error) {
        res.status(500).json({ message: "Error signing up admin." });
      }
    },
  
    login: async (req, res) => {
      // Logic to log in admin
      const { username , password } = req.body;
      try {
        const admin = await Admin.findOne({ username, password });
        if (admin) {
          const token = generateJwtAdmin(admin);
          return res.json({ message: "Logged in successfully.", token });
        }
        res.status(403).json({ message: "Admin authentication failed." });
      } catch (error) {
        res.status(500).json({ message: "Error logging in admin." });
      }
    },
  
    createCourse: async (req, res) => {
        // Logic to create a course
        const course = await Course.findOne(req.body) ;
        if(course)
        {
            return res.status(403).json({ message: "Course already exists." });
        }
        const newCourse = new Course(req.body) ;
        await newCourse.save() ;
        res.json({ message: "Course created successfully.", courseId: newCourse.courseId }) ;
    },
  
    editCourse: async (req, res) => {
        // Logic to edit a course
        const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
        if (course) {
            res.json({ message: "Course updated successfully." });
        } else {
            res.status(404).json({ message: "Course not found." });
        }
    },
  
    getAllCourses: async (req, res) => {
        // Logic to get all the courses
        const courses = await Course.find({});
        res.json({ courses }) ;
    },
  
    getCourseById: async (req, res) => {
        // Logic to get a particular course
        const course = await Course.findById(req.params.courseId);
        res.json({ course }) ;
    }
  };
  
  module.exports = adminController;