const jwt = require("jsonwebtoken");
const User = require("../models/users");
const Employee = require("../models/employees");

// generate new token
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Create new user
exports.register = async (req, res) => {
 try {
  const { empId, isAdmin,username, password, status,districtId } = req.body;
  
  //check if the user is already registered
  const userExists = await User.findOne({username});

  if (userExists) {
    return res.status(400).json({ message: "User already exists", status:"fail" });
  }
//create new user
  const user = await User.create({ username, password,empId,isAdmin, status,districtId });

  if (user) {
    // const empInfo = Employee.findById(empId);
    res.status(201).json({
      message:"New User Created successfully",
      status:"success",
      // data:{
      // _id: user._id,
      // empId,
      // image:empInfo?.image?.url,
      // username: user.username,
      // token: generateToken(user),
      // districtId
      // }
    });
  } else {
    res.status(400).json({ message: "Error occurred while creating new user", status:"fail" });
  }
 } catch (error) {
  return res.status(500).json({message: error.message,status:"fail"});
 }
};

// login user
exports.login = async (req, res) => {
  try {
    const {username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.comparePassword(password))) {
    if(user?.status === "inActive" || user.status == "inActive"){
      return res.json({message:"You are not active please contact the administrator.",status: "fail",success: false})
    }
    const empInfo = await Employee.findById(user.empId);
    // console.log(empInfo)
   return res.json({
      success:true,
      message:"successfully logged in",
      data:{
      _id: user._id,
      username: user.username,
      isAdmin:user.isAdmin,
      empId:user.empId,
      userStatus:user.status,
      districtId:user.districtId,
      token: generateToken(user),
      image:empInfo.image?.url,
      status: "success"
      },
    });
  } else {
   return res.json({ message: "Invalid email or password",status:"fail",success:false });
  }
  } catch (error) {
    return res.json({message: error.message,status:"fail", success:false});
  }
};


// delete user 
exports.deleteUser = async (req, res) => {
    try {
        const deleteUser = await User.findByIdAndRemove(req.body.id);
        return res.status(200).json(deleteUser);
    } catch (error) {
        return res.status(500).json({ error: error.message,status:"fail" })
    }
}

// update user
exports.updateUser = async(req,res)=>{
    try {
        await User.findByIdAndUpdate({_id:req.params.id},req.body,{new:true});
        return res.status(200).json({message:"Successfully Updated...",status:"success"})
    } catch (error) {
        return res.status(500).json({ error: error.message, status:"fail" })
    }
}

// get single user
exports.getSingleUser = async(req,res)=>{
  try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(400).json({message: 'User not found',status:"fail"});
      }
      return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message, status:"fail" })
  }
}

// get all users
exports.getAllUsers = async(req,res)=>{
  try {
    const users = await User.find({}).sort({createdAt:-1});
    if(!users){
      return res.status(400).json({message:"no users found..",status:"fail"})
    }
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message, status:"fail" })
  }
}