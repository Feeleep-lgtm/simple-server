const fs = require("fs");
const express = require("express");
const cors = require("cors");

const app = express();

app.get("/", cors(), (req, res, next) => {
  res.status(200).json({
    slackUsername: "feeleep",
    backend: true,
    age: 25,
    bio: "I am a backend developer. I live in Lagos, Nigeria. I enjoy talking sports, politics, and economy. Gaming, reading, & writing are also my hobbies. I hope to connect with great minds here.",
  });
  next();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server started at port 3000");
});
