var PORT = process.env.YOUR_PORT || process.env.PORT || 80;
const express = require("express");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const app = express();

app.use(express.json());

const uri =
  "mongodb+srv://user:user@cluster0.70kshxo.mongodb.net/?retryWrites=true&w=majority";
const dbName = "ted-talk";
const collectionName = "talks";

const client = new MongoClient(uri, { useUnifiedTopology: true });

client.connect((err) => {
  console.log("database connected");
});

app.get("/", (req, res) => {
  res.json("welcome to ted talk api");
});

app.get("/talks", async (req, res) => {
  let data;

  const keyword = req.query.keyword;

  data = keyword ? await fetchWithKeyword(keyword) : await fetchAll();

  res.json({ count: data.length, data: data });
});

app.get("/talks/:id", async (req, res) => {
  let data;

  try {
    data = await client
      .db(dbName)
      .collection(collectionName)
      .findOne({ id: req.params.id });
  } catch (e) {
    console.log(e);
  }

  res.json(data);
});

const fetchAll = async () => {
  try {
    return await client.db(dbName).collection(collectionName).find().toArray();
  } catch (e) {
    console.error(e);
  }
};

const fetchWithKeyword = async (keyword) => {
  const query = {
    title: {
      $regex: keyword,
      $options: "i",
    },
  };

  let data;
  try {
    data = await client
      .db(dbName)
      .collection(collectionName)
      .find(query)
      .toArray();
  } catch (e) {
    console.error(e);
  }
  return data;
};

app.listen(PORT, () => {
  console.log(`running on PORT ${PORT}`);
});

module.exports = app;
