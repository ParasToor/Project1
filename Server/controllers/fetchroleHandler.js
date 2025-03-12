const pool = require('../database/database');

exports.fetchroleHandler = async(req,res)=>{
     try{
        //  console.log('fetching command trigger');
        const data= await pool.query("select * from roles ");
          // console.log("data while fetching backend",data);

        res.status(200).json({
            success:true,
            data,
        });
     } 
     catch(err){
      console.log(err)
        res.status(500).json({
            success: false,
            message: "Error in fetch Role Handler",
            error: err.message,
          });
     }
} ;