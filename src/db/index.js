const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");

dotenv.config();

const url = process.env.MONGODB_DB;
const dbName = process.env.DB_NAME;

let db;

async function connectToDatabase() {
  const client = new MongoClient(url, { useUnifiedTopology: true });
  await client.connect();
  db = client.db(dbName);
  console.log("Connected to the database");
}

function getDatabase() {
  return db;
}

module.exports = { connectToDatabase, getDatabase };
