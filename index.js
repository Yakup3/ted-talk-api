const PORT = process.env.PORT || 8000;

const express = require("express");
const fs = require("fs");
const app = express();

var talks = [];

fs.readFile("tedtalk.json", "utf8", (err, data) => {
  if (err) console.log(err);
  talks = JSON.parse(data);
});

app.get("/", (req, res) => {
  res.json("welcome to ted talk api");
});

app.get("/talks", (req, res) => {
  res.json(talks);
});

app.get("/talks/:keyword", (req, res) => {
  const searchedTalk = req.params.keyword;
  const specificTalk = talks.filter((talk) =>
    talk.title.toLowerCase().includes(searchedTalk.toLowerCase())
  );

  res.json(specificTalk);
});

app.listen(PORT, () => {
  console.log(`running on PORT ${PORT}`);
});
