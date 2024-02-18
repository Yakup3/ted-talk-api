const dotenv = require("dotenv");
const express = require("express");
const { connectToDatabase } = require("./src/db");
const talksRoutes = require("./src/routes/routes");

dotenv.config();

const app = express();
app.use(express.json());

connectToDatabase()
  .then(() => {
    app.use(express.json());

    app.get("/", (req, res) => {
      res.send("welcome to ted talk api");
    });

    app.use("/talks", talksRoutes);

    app.listen(process.env.PORT, () => {
      console.log("Server is running on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(process.env.MONGODB_DB);
    console.error("Failed to connect to the database:", error);
  });
