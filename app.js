const fs = require("fs");
const express = require("express");
const { body, validateResult } = require("express-validator");
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

app.post("/", body("x").isInt(), body("y").isInt(), (req, res) => {
  const x = req.body.x;
  const y = req.body.y;
  const operator = req.body.operation_type;
  const operatorEnum = ["addition", "subtraction", "multiplication"];
  let result;
  let index;

  const errors = validateResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (operatorEnum.includes(operator)) {
    if (operator === "addition") {
      index = 0;
      result = x + y;
    } else if (operator === "subtraction") {
      index = 1;
      result = x - y;
    } else if (operator === "multiplication") {
      result = x * y;
      index = 3;
    }
    return res.status(200).json({
      status: "success",
      data: {
        slackUsername: "feeleep",
        operation_type: operatorEnum[index],
        result,
      },
    });
  } else {
    return res.status(400).json({
      status: "fail",
      message: "Insert a valid Operator",
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server started at port 3000");
});
