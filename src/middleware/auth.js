'use strict';
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  if(!req.header('Authorization')) {
    return res.status(401).json({ error: 'Access denied. Provide a token.' });
  }
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Access denied. Provide a token.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.role = decoded.role;
    req.userId = decoded.userId
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = auth;
