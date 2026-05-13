const express = require('express');
const router = express.Router();
const db = require('../data/database');

// CWE-89: SQL Injection - user input directly in query
router.get('/api/admin/audit', (req, res) => {
  const userId = req.query.user_id;
  const query = `SELECT * FROM audit_logs WHERE user_id = '${userId}' ORDER BY created_at DESC`;
  db.sequelize.query(query).then(logs => res.json(logs));
});

// CWE-78: Command Injection - unsanitized input in exec
const { exec } = require('child_process');
router.post('/api/admin/diagnostics', (req, res) => {
  const target = req.body.hostname;
  exec(`ping -c 3 ${target}`, (err, stdout) => {
    res.json({ result: stdout || err.message });
  });
});

// CWE-22: Path Traversal - no sanitization on file path
const fs = require('fs');
const path = require('path');
router.get('/api/admin/logs/:filename', (req, res) => {
  const logPath = path.join('/var/log/app/', req.params.filename);
  fs.readFile(logPath, 'utf8', (err, data) => {
    if (err) return res.status(404).json({ error: 'Log not found' });
    res.type('text/plain').send(data);
  });
});

module.exports = router;