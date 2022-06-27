var PORT = process.env.YOUR_PORT || process.env.PORT || 80;
const express = require("express");

const app = express();

app.use(express.json());

const fs = require("fs");

var talks = [];

fs.readFile("tedTalkDetailed.json", "utf8", (err, data) => {
  if (err) console.log(err);
  talks = JSON.parse(data);
});

app.get("/", (req, res) => {
  res.json("welcome to ted talk api");
});

app.get("/talks", (req, res) => {
  res.json("this is talks path");
});

app.listen(PORT, () => {
  console.log(`running on PORT ${PORT}`);
});

module.exports = app;
