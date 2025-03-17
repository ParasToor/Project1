const express = require("express");
const app = express();
const router = require("./routes/userRoute");
const cors = require("cors");

// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use("/v1", router);
module.exports = app;
