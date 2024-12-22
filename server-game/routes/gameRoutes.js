const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// Middleware kiểm tra JWT
const verifyJWT = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    req.user = decoded;
    next();
  });
};

// Ví dụ một route để lấy danh sách người chơi online
router.get('/users-online', verifyJWT, (req, res) => {
  // Giả sử có một mảng người chơi online
  const usersOnline = [
    { username: 'player1', avatar: 'avatar1.png' },
    { username: 'player2', avatar: 'avatar2.png' }
  ];
  
  res.json({ usersOnline });
});

module.exports = router;
