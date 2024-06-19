'use strict';

const User = require('../models/User');

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    const user = new User({ name, email, password });
    await user.save();
    res.status(200).json({ message: 'User registered successfully', user });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  res.status(200).json({ token: req.token, user: req.user });
}

async function getUsers(req, res, next) {
  try {
    const users = await User.find();
    console.log('GET USERS FUNCTION', req.role);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

module.exports = { login, register, getUsers };
