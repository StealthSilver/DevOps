import express from "express";
import { client } from "@repo/db/client";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hi there");
});

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
});

app.listen(3000);
