const { v4: uuidv4 } = require("uuid");
const pool = require("../database/database");

exports.createHandler = async (req, res) => {
  try {
    const data = req.body.data;
    const id = uuidv4();


    const createEntry = await pool.query(`INSERT INTO config VALUES (
        '${id}', 
        '${data.ip_address}', 
        '${data.hostname}', 
        ${data.port}, 
        '${data.protocol}', 
        '${data.base_url}', 
        '${data.api_endpoint}', 
        '${data.username}', 
        '${data.password}', 
        '${data.access_token}', 
        '${data.api_key}', 
        '${data.client_id}', 
        '${data.client_secret}', 
        '${data.encryption_key}', 
        '${data.cert_path}', 
        '${data.db_host}', 
        ${data.db_port}, 
        '${data.db_name}', 
        '${data.db_username}', 
        '${data.db_password}',
        ${data.active}
    );`);

    res.status(200).json({
      success: true,
      message: "entry created",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "error inside create Handler",
      error: err.message,
    });
  }
};

