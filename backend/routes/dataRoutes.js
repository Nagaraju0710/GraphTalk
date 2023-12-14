// routes/dataRoutes.js
const express = require('express');
const db = require('../db');

const router = express.Router();

// Get all data
router.get('/', (req, res) => {
  const allData = db.getAllData();
  res.json(allData);
});

// Post data
router.post('/', (req, res) => {
  const newData = req.body;
  const addedData = db.addData(newData);
  res.json(addedData);
});

module.exports = router;
