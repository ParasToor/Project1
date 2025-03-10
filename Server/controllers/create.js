const { v4: uuidv4 } = require("uuid");
const pool = require("../database/database");

exports.createHandler = async (req, res) => {
  try {
    const data = req.body.data;
    const id = uuidv4();

    console.log("data fro frontEnd to create - ", data);

    const createEntry = await pool.query(`INSERT INTO config VALUES (
        '${id}', 
        '${data.ip_address}', 
        '${data.hostnam}', 
        ${data.port}, 
        '${data.protocol}', 
        '${data.base_url}', 
        '${data.api_endpoint}', 
        '${data.usernam}', 
        '${data.passwor}', 
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

// ip_address: 'kjjnjkn',
//   hostname: 'jnjkn',
//   port: '897',
//   protocol: 'kbkj',
//   base_url: 'kjnkjnk',
//   api_endpoint: 'kjnknkn',
//   username: 'kjnknkjn',
//   password: 'jknkjnkn',
//   access_token: 'kjnkjnkjn',
//   api_key: 'kjnjknkjn',
//   client_id: 'kjnkjnkjn',
//   client_secret: 'kjnkjn',
//   encryption_key: 'kjnkjn',
//   cert_path: 'kjnkjnjkn',
//   db_host: 'kjnkj',
//   db_port: '908',
//   db_name: 'jnln',
//   db_username: 'kjknkjn',
//   db_password: 'jknkjkn',
//   active: 'true'
