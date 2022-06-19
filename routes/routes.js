const express = require("express");
const router = express.Router();
const fs = require("fs");

var talks = [];

fs.readFile("tedTalkDetailed.json", "utf8", (err, data) => {
  if (err) console.log(err);
  talks = JSON.parse(data);
});

router.get("/", (req, res) => {
  res.json("welcome to ted talk api");
});

router.get("/talks", (req, res, next) => {
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

module.exports = router;
