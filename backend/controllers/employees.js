const Employee = require(".././models/employees")

// create a new employee
exports.createEmployee = async(req,res)=>{
    try {
        const employee = await Employee.create(req.body);
        if(employee){
            return res.status(200).json({employee: employee})
        }else{
            return res.status(400).json({message:"error while creating employee"})
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

// get all employees
exports.getAllEmployees = async(req, res)=>{
    try {
        const employees = await Employee.find({}).sort({createdAt:-1});
        if(!employees){
            return res.status(400).json({message:"no employees found.."})
        }

        return res.status(200).json(employees);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

// get single employee
exports.getSingleEmployee = async(req, res)=>{
    try {
        const employee = await Employee.findById(req.params.id);
        if(!employee) return res.status(400).json({message: 'No employee found..'});
        return res.status(200).json(employee);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// update employee
exports.updateEmployee = async(req, res)=>{
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body);
        if(!employee) return res.status(400).json({message: 'employee not updated...'})
        return res.status(200).json({message: "Employee updated successfully.."});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// delete employee
exports.deleteEmployee = async(req,res)=>{
    try {
        const employee = await Employee.findByIdAndRemove(req.params.id);
        if(!employee){
            return res.status(400).json({message:"error while deleting employee"});
        }
        return res.status(200).json({message:"employee deleted successfully"});
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}