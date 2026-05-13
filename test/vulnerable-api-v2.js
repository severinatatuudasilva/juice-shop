// S7-1 attempt 7 - vulnerable endpoint for inline PR comments
const express = require("express");
const router = express.Router();

// SQL Injection - CWE-89
router.get("/users/:id", (req, res) => {
  const query = "SELECT * FROM users WHERE id = " + req.params.id;
  db.execute(query).then(rows => res.json(rows));
});

// Path Traversal - CWE-22
router.get("/download", (req, res) => {
  const filePath = "/uploads/" + req.query.filename;
  res.sendFile(filePath);
});

// Insecure deserialization - CWE-502
router.post("/data", (req, res) => {
  const obj = eval("(" + req.body.payload + ")");
  res.json(obj);
});

module.exports = router;
