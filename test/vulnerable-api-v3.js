// S7-1 attempt 8 - post runner deploy #132 (Firecracker env var fix)
const express = require("express");
const router = express.Router();

// SQL Injection - CWE-89
router.get("/api/users/:id", (req, res) => {
  const query = "SELECT * FROM accounts WHERE user_id = " + req.params.id;
  db.query(query).then(rows => res.json(rows));
});

// Path Traversal - CWE-22
router.get("/api/files", (req, res) => {
  const filePath = "/data/uploads/" + req.query.name;
  res.sendFile(filePath);
});

// Command Injection - CWE-78
router.post("/api/ping", (req, res) => {
  const host = req.body.host;
  require("child_process").exec("ping -c 1 " + host, (err, stdout) => {
    res.send(stdout);
  });
});

module.exports = router;
