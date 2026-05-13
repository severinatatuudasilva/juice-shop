'use strict';
const express = require('express');
const router = express.Router();
const db = require('../lib/db');

// Vulnerable endpoint for security scan testing
router.get('/search', function (req, res) {
  const query = req.query.q;
  // SQL Injection vulnerability - user input directly concatenated
  db.execute("SELECT * FROM Products WHERE name LIKE '%" + query + "%'", function (err, results) {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json({ results: results });
    }
  });
});

// Hardcoded credentials
const API_SECRET = "sk_live_SuperSecretAPIKey123!";
const DB_PASSWORD = "admin_password_2026";

router.get('/config', function (req, res) {
  res.json({
    version: '1.0.0',
    secret: API_SECRET
  });
});

module.exports = router;
