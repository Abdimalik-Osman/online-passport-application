const jwt = require("jsonwebtoken");
const User = require("../models/users");

// generate new token
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Create new user
exports.register = async (req, res) => {
  const { epmId, isManager,username, password } = req.body;

  //check if the user is already registered
  const userExists = await User.findOne({username});

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }
//create new user
  const user = await User.create({ username, password,epmId,isManager });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      token: generateToken(user),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// login user
exports.login = async (req, res) => {
  const {username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.comparePassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      isManager:user.isManager,
      empId:user.empId,
      token: generateToken(user),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};


// delete user 
exports.deleteUser = async (req, res) => {
    try {
        const deleteUser = await User.findByIdAndRemove(req.body.id);
        return res.status(200).json(deleteUser);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

// update user
exports.updateUser = async(req,res)=>{
    try {
        await User.findByIdAndUpdate({_id:req.params.id},req.body,{new:true});
        return res.status(200).json({message:"Successfully Updated..."})
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

// get single user
exports.getSingleUser = async(req,res)=>{
  try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(400).json({message: 'User not found'});
      }
      return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

// get all users
exports.getAllUsers = async(req,res)=>{
  try {
    const users = await find({}).sort({createdAt:-1});
    if(!users){
      return res.status(400).json({message:"no users found.."})
    }
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}