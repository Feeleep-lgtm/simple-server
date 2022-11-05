const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");

const cors = require("cors");

const app = express();
app.use(express.json());
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
  let operator = req.body.operation_type;
  const operatorEnum = ["addition", "subtraction", "multiplication"];
  let result = 0;
  let index;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // if (operatorEnum.includes(operator)) {
  if (operator === "addition") {
    index = 0;
    result = x + y;
  } else if (operator === "subtraction") {
    index = 1;
    result = x - y;
  } else if (operator === "multiplication") {
    result = x * y;
    index = 2;
  } else {
    let add = ["addition", "add", "plus"];
    let subtract = ["subtract", "minus"];
    let multiply = ["multiplication", "multiply", "multiple", "times"];
    let operands = operator.split(" ");
    let data = [];
    operands.forEach((element) => {
      if (add.includes(element.toLowerCase())) {
        operator = "addition";
        console.log(operator);
      } else if (subtract.includes(element.toLowerCase())) {
        operator = "subtraction";
      } else if (multiply.includes(element.toLowerCase())) {
        operator = "multiplication";
      }
      if (!isNaN(element)) {
        data.push(parseInt(element));
      }
    });
    if (data.length > 0) {
      console.log(data);
      console.log(result);
      for (let i = 0; i < data.length; i++) {
        if (i == 0) {
          result = parseInt(data[i]);
          console.log(result);
          console.log();
        } else {
          if (operator == "addition") {
            index = 0;
            result += parseInt(data[i]);
            console.log(data[i]);
            console.log(result);
          } else if (operator == "subtraction") {
            index = 1;
            result -= parseInt(data[i]);
          } else if (operator == "multiplication") {
            result *= parseInt(data[i]);
            index = 2;
          }
        }
      }
    } else {
      console.log("hi");
      if (operator == "addition") {
        index = 0;
        result = x + y;
      } else if (operator == "subtraction") {
        index = 1;
        result = x - y;
      } else if (operator == "multiplication") {
        result = x * y;
        index = 2;
      }
    }
  }
  return res.status(200).json({
    slackUsername: "feeleep",
    operation_type: operator,
    result,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server started at port 3000");
});
