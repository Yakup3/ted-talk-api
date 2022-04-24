// const PORT = process.env.PORT;
var PORT = process.env.YOUR_PORT || process.env.PORT || 80;

const express = require("express");
const fs = require("fs");
const app = express();

var talks = [];

fs.readFile("tedTalkDetailed.json", "utf8", (err, data) => {
  if (err) console.log(err);
  talks = JSON.parse(data);
});

app.get("/", (req, res) => {
  res.json("welcome to ted talk api");
});

app.get("/talks", (req, res, next) => {
  const searchedTalk = req.query.keyword;
  const views = req.query.views;
  const likes = req.query.likes;

  const talkData = searchedTalk == undefined ? "" : searchedTalk;
  const viewsData = views == undefined ? 0 : views;
  const likesData = likes == undefined ? 0 : likes;

  const specificTalk = talks.filter(
    (talk) =>
      talk.title.toLowerCase().includes(talkData.toLowerCase()) &&
      talk.likes > likesData &&
      talk.views > viewsData
  );
  res.json(specificTalk);
});

app.listen(PORT, () => {
  console.log(`running on PORT ${PORT}`);
});
