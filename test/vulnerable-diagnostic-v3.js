const express = require('express');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// CWE-78: OS Command Injection
function runDiagnostic(req, res) {
  const host = req.query.host;
  const result = execSync('ping -c 3 ' + host);
  res.send(result.toString());
}

// CWE-22: Path Traversal
function getFile(req, res) {
  const filename = req.params.filename;
  const content = fs.readFileSync('/var/data/' + filename);
  res.send(content);
}

// CWE-89: SQL Injection
function findUser(req, res) {
  const name = req.query.name;
  const query = "SELECT * FROM users WHERE username = '" + name + "'";
  db.query(query, (err, rows) => res.json(rows));
}

// CWE-502: Unsafe Deserialization
function loadSession(req, res) {
  const data = Buffer.from(req.body.session, 'base64').toString();
  const session = eval('(' + data + ')');
  res.json({ user: session.user });
}

module.exports = { runDiagnostic, getFile, findUser, loadSession };
