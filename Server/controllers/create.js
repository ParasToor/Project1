const { v4: uuidv4 } = require("uuid");
const pool = require("../database/database");
const Config = require("../models/ConfigModel");

exports.createHandler = async (req, res) => {
  try {
    const data = req.body.data;
    const id = uuidv4();

    const newConfig = Config.create({
      id: id,
      ip_address: data.ip_address,
      hostname: data.hostname,
      port: data.port,
      protocol: data.protocol,
      base_url: data.base_url,
      api_endpoint: data.api_endpoint,
      username: data.username,
      password: data.password,
      access_token: data.access_token,
      api_key: data.api_key,
      client_id: data.client_id,
      client_secret: data.client_secret,
      encryption_key: data.encryption_key,
      cert_path: data.cert_path,
      db_host: data.db_host,
      db_port: data.db_port,
      db_name: data.db_name,
      db_username: data.db_username,
      db_password: data.db_password,
      active: data.active,
    });

    // const createEntry = await pool.query(`INSERT INTO config VALUES (
    //     '${id}', 
    //     '${data.ip_address}', 
    //     '${data.hostname}', 
    //     ${data.port}, 
    //     '${data.protocol}', 
    //     '${data.base_url}', 
    //     '${data.api_endpoint}', 
    //     '${data.username}', 
    //     '${data.password}', 
    //     '${data.access_token}', 
    //     '${data.api_key}', 
    //     '${data.client_id}', 
    //     '${data.client_secret}', 
    //     '${data.encryption_key}', 
    //     '${data.cert_path}', 
    //     '${data.db_host}', 
    //     ${data.db_port}, 
    //     '${data.db_name}', 
    //     '${data.db_username}', 
    //     '${data.db_password}',
    //     ${data.active}
    // );`);

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
