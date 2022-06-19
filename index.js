var PORT = process.env.YOUR_PORT || process.env.PORT || 80;

const express = require("express");

const app = express();

app.use(express.json());

const router = require("./routes/routes");

app.use("/", router);

app.listen(PORT, () => {
  console.log(`running on PORT ${PORT}`);
});
