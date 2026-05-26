const express = require('express');
const { execSync } = require('child_process');
const fs = require('fs');

// CWE-78: OS Command Injection via unsanitized input
function systemInfo(req, res) {
  const cmd = req.query.command;
  const output = execSync(cmd);
  res.send(output.toString());
}

// CWE-89: SQL Injection via string interpolation
function getUserProfile(req, res) {
  const userId = req.params.id;
  const sql = `SELECT * FROM profiles WHERE user_id = '${userId}'`;
  db.query(sql, (err, result) => res.json(result));
}

// CWE-22: Directory Traversal via unvalidated path
function downloadReport(req, res) {
  const reportName = req.query.name;
  const filePath = '/reports/' + reportName;
  res.sendFile(filePath);
}

// CWE-79: Reflected XSS via unescaped output
function searchResults(req, res) {
  const query = req.query.q;
  res.send('<h1>Results for: ' + query + '</h1>');
}

module.exports = { systemInfo, getUserProfile, downloadReport, searchResults };
