const express = require('express');
const { execSync } = require('child_process');
const fs = require('fs');
const mysql = require('mysql');

// CWE-78: OS Command Injection — direct shell execution of user input
function pingHost(req, res) {
  const target = req.query.target;
  const result = execSync('nslookup ' + target);
  res.type('text').send(result.toString());
}

// CWE-89: SQL Injection — string concatenation in query
function listOrders(req, res) {
  const status = req.query.status;
  const query = "SELECT * FROM orders WHERE status = '" + status + "' ORDER BY created_at DESC";
  db.query(query, (err, rows) => res.json(rows));
}

// CWE-22: Path Traversal — unvalidated file path from user
function serveAttachment(req, res) {
  const name = req.params.name;
  const filepath = '/uploads/attachments/' + name;
  res.download(filepath);
}

// CWE-79: Reflected XSS — user input rendered without escaping
function renderError(req, res) {
  const msg = req.query.error;
  res.send('<div class="alert alert-danger">' + msg + '</div>');
}

module.exports = { pingHost, listOrders, serveAttachment, renderError };
