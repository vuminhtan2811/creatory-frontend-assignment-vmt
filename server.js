const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const data = require("./data.json");
const cors = require("cors");

// app.use(bodyParser.json());

var whitelist = ["http://localhost:3000", "http://localhost:3001"];

app.use(
  cors({
    credentials: true,
    origin: [...whitelist],
  })
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post("/auth", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "admin" && password === "admin") {
    res.json({ authenticated: true });
  } else {
    res.status(401).send({ authenticated: false });
  }
});

app.get("/data", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = req.query.limit || 2;

  const start = (page - 1) * limit;
  const end = page * limit;

  const employees = data.slice(start, end);
  const totalPages =
    Math.floor(data.length / limit) + (data.length % limit > 0 && +1);
  res.send({
    pagination: {
      totalPages,
      limit,
      page,
    },
    employees,
  });
});

app.listen(8888, () => {
  console.log("Creatory frontend assignment dev server is running :)");
});
