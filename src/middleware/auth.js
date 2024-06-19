'use strict';
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Access denied. Provide a token.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.role = decoded.role;
    console.log(decoded, req.role, 'AUTH FUNCTION');
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = auth;
