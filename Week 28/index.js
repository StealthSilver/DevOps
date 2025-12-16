const express = require("express");
import cluster from "cluster";
const os = require("os");

console.log("cpu count : ", os.cpus().length);

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
