const Employee = require(".././models/employees")
const cloudinary = require("../../cloudinary/upload");
// create a new employee
exports.createEmployee = async(req,res)=>{
    try {
        const {empName,isManager,sex,districtId,image} = req.body;
        const imageRes = await cloudinary.uploader.upload(image, {
            folder: 'employees'
          });
        const employee = await Employee.create({
            empName,
            isManager,
            sex,
            districtId,
            image: {       
                public_id:imageRes.public_id,
                url:imageRes.secure_url
            },
        });
        if(employee){
            return res.status(200).json({message: "new Employee Saved Successfully", status:"success"})
        }else{
            return res.status(400).json({message:"error while creating employee", status:"fail"})
        }
    } catch (error) {
        return res.status(500).json({message: error.message, status:"fail"});
    }
}

// get all employees
exports.getAllEmployees = async(req, res)=>{
    try {
        const employees = await Employee.find({}).sort({createdAt:-1});
        if(!employees){
            return res.status(400).json({message:"no employees found..", status:"fail"})
        }

        return res.status(200).json(employees);
    } catch (error) {
        return res.status(500).json({message: error.message,status:"fail"});
    }
}

// get single employee
exports.getSingleEmployee = async(req, res)=>{
    try {
        const employee = await Employee.findById(req.params.id);
        if(!employee) return res.status(400).json({message: 'No employee found..',status:"fail"});
        return res.status(200).json(employee);
    } catch (error) {
        return res.status(500).json({message:error.message,status:"fail"})
    }
}

// update employee
exports.updateEmployee = async(req, res)=>{
    try {
     
        const imageRes = await cloudinary.uploader.upload(req.body.image, {
            folder: 'employees'
          });
      
        
        const employee = await Employee.findByIdAndUpdate(req.params.id, {$set:{
            empName: req.body.empName,
            empPhone:req.body.empPhone,
            // isActive:req.body.isActive,
            isManager:req.body.isManager,
            image: {       
                public_id:imageRes.public_id,
                url:imageRes.secure_url
            },
        }},{new:true});
        if(!employee) return res.status(400).json({message: 'employee not updated...',status:"fail"})
        return res.status(200).json({message: "Employee updated successfully..",status:"success"});
    } catch (error) {
        return res.status(500).json({message:error.message,status:"fail"})
    }
}

// delete employee
exports.deleteEmployee = async(req,res)=>{
    try {
        const employee = await Employee.findByIdAndRemove(req.params.id);
        if(!employee){
            return res.status(400).json({message:"error while deleting employee",status:"fail"});
        }
        return res.status(200).json({message:"employee deleted successfully",status:"success"});
    } catch (error) {
        return res.status(500).json({message: error.message,status:"fail"})
    }
}