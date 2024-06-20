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

async function getOneUser(req, res, next) {
  const { userId } = req.params;
  try {
    if (req.role === 'user') {
      if (req.userId === userId) {
        const user = await User.findById(userId);
        return res.status(200).json(user);
      }
    } else if (req.role === 'admin') {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found!' });
      }
      return res.status(200).json(user);
    }

    res.status(403).json({ error: ' Not Allowed.' });
  } catch (error) {
    next(error);
  }
}

async function updateOneUser(req, res, next) {
  try {
    const { userId } = req.params;
    console.log(userId);
    const { name, email, password, role } = req.body;
    // const user = await User.findByIdAndUpdate(userId ,req.body, {new: true})
    const user = await User.findById(userId);
    console.log(user, '-----------------');
    if (!user) {
      return res.status(404).json({ error: 'User not found!' });
    }
    if (req.role === 'admin') {
      if (role) user.role = role;
    }
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function deleteOneUser(req, res, next) {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }
    res.status(204).json({ message: 'deleted' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid ID provided.' });
    }
    next(error);
  }
}

module.exports = {
  login,
  register,
  getUsers,
  deleteOneUser,
  updateOneUser,
  getOneUser,
};
