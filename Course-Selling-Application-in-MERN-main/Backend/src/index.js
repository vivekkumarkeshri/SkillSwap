// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const adminRoutes = require("./routes/adminRoutes");
// const userRoutes = require("./routes/userRoutes");

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Backend is running. Use /admin or /users endpoints.');
// });

// const PORT = process.env.PORT || 3000;
// const DATABASE_URL = process.env.MONGO_URL;

// // Connect to the Database
// mongoose.connect(DATABASE_URL, { dbName: "Course-App" })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((error) => {
//     console.error("MongoDB connection error:", error.message);
//     console.error("Backend is still running, but API routes will fail until the database is reachable.");
//   });

// // Route Handlers
// app.use('/admin', adminRoutes);
// app.use('/users', userRoutes);

// // Start the server and listen on the specified PORT
// app.listen(PORT, () => {
//   console.log(`Server running on PORT: ${PORT}`);
// });


// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const adminRoutes = require("./routes/adminRoutes");
// const userRoutes = require("./routes/userRoutes");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 3000;
// const DATABASE_URL = process.env.DATABASE_URL;

// // Connect to the Database
// mongoose.connect(DATABASE_URL, { dbName: "Course-App" });

// // Route Handlers
// app.use('/admin', adminRoutes);
// app.use('/users', userRoutes);

// // Start the server and listen on the specified PORT
// app.listen(PORT, () => {
//   console.log(`Server running on PORT: ${PORT}`);
// });


// ✅ Load environment variables (IMPORTANT - top pe hi rakho)
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Port & DB
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.MONGO_URL; // ✅ same name as .env

// Debug (optional - check karne ke liye)
console.log("Mongo URL:", DATABASE_URL);

// Test route
app.get("/", (req, res) => {
  res.send("API is working ✅");
});

// Routes
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);

// Connect DB + Start Server
mongoose.connect(DATABASE_URL)
.then(() => {
  console.log("DB connected ✅");

  app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
  });
})
.catch((err) => {
  console.log("DB Error ❌", err);
});