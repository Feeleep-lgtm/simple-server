const fs = require("fs");
const express = require("express");
const cors = require("cors");

const app = express();

app.get("/", cors(), (req, res, next) => {
  res.status(200).json({
    slackUsername: "feeleep",
    backend: true,
    age: 25,
    bio: "I am a backend developer. I live in Lagos, Nigeria. I am 25 years old",
  });
  next();
});

const port = 3000;
app.listen(port, () => {
  console.log("server started at port 3000");
});
