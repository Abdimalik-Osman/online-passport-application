const express = require('express');


const router = express.Router();

router.get('/',async(req,res)=>{
    return res.send("welcome")
})

module.exports = router;