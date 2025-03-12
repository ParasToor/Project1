const pool=require('../database/database');
const bcrypt = require('bcrypt');

exports.createuserHandler= async(req,res)=>{
    try{
       const data=req.body.data;
    const checkUserSql = 'SELECT * FROM users_data WHERE email = ?';
    const [existingUser] = await pool.query(checkUserSql, [data.userName]);

    if (existingUser.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'User already exists'
        });
    }
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
       console.log('data from fd is ',data);
    const sql = 'INSERT INTO users_data (email, password, role_id) VALUES (?, ?, ?)';
    const createquery = await pool.query(sql, [data.userName, data.password, data.role]);   
     res.status(200).json({
        success:true,
        message:'user created '
       });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
          success: false,
          message: "error while  createuser Handler",
          error: err.message,
        }); 
    }
}