require("dotenv").config();
const mongoose = require("mongoose")
const connectDB = async()=>{
   
    try{
        const connectionParams={
            useNewUrlParser: true,
            useUnifiedTopology: true 
        }
       await mongoose.connect(process.env.DB_URL,connectionParams)
            .then( () => {
                console.log('Connected to the database ')
            })
            .catch( (err) => {
                console.error(`Error connecting to the database. n${err}`);
            })
        

    }catch(err){
        console.log(err.message);
    }
}

module.exports = connectDB