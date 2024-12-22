const express = require('express');
const router = express.Router();

// Define routes for authentication
router.get('/login', (req, res) => {
  res.render('login');
});

// Add other routes here

module.exports = router;
