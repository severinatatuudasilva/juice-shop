const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createConnection({host: "localhost", user: "root", password: "password123", database: "testdb"});

app.get("/user", (req, res) => {
  const userId = req.query.id;
  const query = "SELECT * FROM users WHERE id = " + userId;
  db.query(query, (err, results) => {
    if (err) { res.status(500).send("Error"); return; }
    res.json(results);
  });
});

app.listen(3001);
