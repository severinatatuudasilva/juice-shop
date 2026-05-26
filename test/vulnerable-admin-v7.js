const express = require('express');
const { execSync } = require('child_process');
const fs = require('fs');
const mysql = require('mysql');

const app = express();
const db = mysql.createConnection({host: 'localhost', user: 'root', database: 'shop'});

// CWE-89: SQL Injection
app.get('/api/admin/users', (req, res) => {
  const query = "SELECT * FROM users WHERE role = '" + req.query.role + "'";
  db.query(query, (err, results) => {
    res.json(results);
  });
});

// CWE-78: Command Injection  
app.get('/api/admin/backup', (req, res) => {
  const output = execSync('mysqldump ' + req.query.database);
  res.send(output);
});

// CWE-22: Path Traversal
app.get('/api/admin/logs', (req, res) => {
  const logFile = fs.readFileSync('/var/log/' + req.query.filename);
  res.send(logFile);
});

module.exports = app;
