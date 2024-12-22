const express = require('express');
const router = express.Router();

// Define routes for user-related actions
router.get('/profile', (req, res) => {
  res.render('userProfile');
});

// Add other routes here

module.exports = router;
