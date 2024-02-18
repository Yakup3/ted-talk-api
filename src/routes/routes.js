const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { getDatabase } = require("../db");

const collectionName = "talks";

router.get("/", async (req, res, next) => {
  const keyword = req.query.keyword;

  keyword ? await fetchWithKeyword(res, keyword) : await fetchAll(res);
});

router.get("/:id", async (req, res, next) => {
  try {
    const talkId = req.params.id;
    const db = getDatabase();
    const objectId = new ObjectId(talkId);

    const talk = await db.collection(collectionName).findOne({ _id: objectId });

    if (!talk) {
      return res
        .status(404)
        .json({ message: "Talk not found", success: false });
    }

    res.status(200).json({ talk, success: true });
  } catch (e) {
    console.log(e);
    console.error("Get talk with id error:", e);
    res.status(500).json({ message: "Internal server error", success: false });
  }
});

const fetchAll = async (res) => {
  try {
    const db = getDatabase();

    const talks = await db.collection(collectionName).find().toArray();

    res.status(200).json({ count: talks.length, data: talks, success: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const fetchWithKeyword = async (res, keyword) => {
  try {
    const db = getDatabase();

    const query = {
      title: {
        $regex: keyword,
        $options: "i",
      },
    };

    const talks = await db.collection(collectionName).find(query).toArray();

    res.status(200).json({ count: talks.length, data: talks, success: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = router;
