const User = require('../models/User');

async function mockAuth(req, res, next) {
  // find or create user Default User in MongoDB
  try {
    const user =  await User.findOne({ email: 'bob@example.com' });
    if (!user) {
      const newUser = new User({
        name: 'Bob',
        email: 'bob@example.com',
        password: 'password',
        role: 'admin',
      });
      await newUser.save();
    }
    req.user = user;
    req.userId = user._id;
    req.role = user.role
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = mockAuth;