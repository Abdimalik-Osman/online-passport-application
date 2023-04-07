const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
Implement authentication methods and controllers:
Create a new folder named controllers and inside it, create a file called authController.js. Add the following code to define the authentication methods and controllers:

const jwt = require("jsonwebtoken");
const User = require("../models/user");

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({ username, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};
Set up routes for authentication endpoints:
Create a new folder named routes and inside it, create a file called authRoutes.js. Add the following code to define the routes for authentication endpoints:

const express = require("express");
const { register, login } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
Configure your server:
Create a new file called server.js in your project root directory. Add the following code to set up your server:

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
Environment variables:
Create a new file called .env in your project root directory. Add the following code:

MONGODB_URI=mongodb://username:password@your_mongodb_cluster_url/your_database_name
JWT_SECRET=your_jwt_secret
PORT=5000
Replace the placeholders with your actual MongoDB connection string, JWT secret, and desired port number.

Now, you can run your server using node server.js. You'll have two authentication endpoints, /api/auth/register and `/api