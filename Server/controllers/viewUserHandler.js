const pool = require("../database/database");

exports.viewUserHandler = async (req, res) => {
  try {   
   
    const data = await pool.query("SELECT u.id as id,u.email as email,u.password as password,r.id as rid,r.name,r.permissions FROM users_data as u LEFT JOIN roles as r ON u.role_id = r.id");
    // const data1 = await pool.query("SELECT * FROM users_data ");
    // const data2 = await pool.query("SELECT * FROM roles");
    
     console.log('view users all data',data);
     

    const sqlData = data[0];

    res.status(200).json({
      success: true,
      sqlData,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in view Handler",
      error: err.message,
    });
  }
};
