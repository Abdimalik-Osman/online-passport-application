const Applicant = require("../models/applicants");
const CID = require("../models/CID");
const Region = require("../models/region");
exports.createApplicant = async(req,res)=>{
    try {

       const cIdData = await CID.findOne({cIdNumber:Number(req.body.CIDNumber)});
       const regionalData = await Region.findOne({serialNumber:Number(req.body.regionalID)});
       if(regionalData){
        if(regionalData.endDate < Date.now()){
            return res.status(404).json({message:'Dhalashadaada waqtiga wuu ka dhacay...'})
        }else{
            if(cIdData){
                if(cIdData.status === true || cIdData.status == true || cIdData.status == "true"){
                    return res.status(201).json("successfully created................");
                }else{
                    return res.status(404).json({message:"Fadlan adiga waxaa tahay dambiile.."})
                }
            }else{
                return res.status(404).json({message:"CID numberkan majiro,Fadlan marka hore iska soo diiwan gali CID-da"})
            }
        }
       }else{
        return res.status(404).json({message:"Dhalasho numberkan majiro, fadlan marka hore iska soo diiwan gali xarunta gobolka"})
       }
       
       let passportExpirationData = new Date();
       
       passportExpirationData.setFullYear(passportExpirationData.getFullYear() + 1);
       
        const newApplicant = new Applicant(
            {
                fullname:regionalData?.fullName,
                motherName:req.body.motherName,
                phoneNumber:req.body.phoneNumber,
                DOB:regionalData?.DOB,
                sex:regionalData?.sex,
                POB:req.body.POB,
                occupation:req.body.occupation,
                applyingPlace:req.body.applyingPlace,
                // passportType:
                applyingDate:req.body.applyingDate,
                serialNO:req.body.serialNO, 
                status:req.body.status,
                expireDate:req.body.expireDate,
                CIDNumber:req.body.CIDNumber,
                regionalID:req.body.regionalID
                
            }
        )
    } catch (err) {
        return res.status(500).json({message:err.message});
    }
}