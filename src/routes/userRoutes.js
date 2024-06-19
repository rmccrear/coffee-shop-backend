const { register, login, getUsers } = require('../controllers/userControllers');
const auth = require('../middleware/auth');
const { checkEmail, checkPassword, signToken } = require('../middleware/login');
const role = require('../middleware/role');

const userRouter = require('express').Router();

userRouter.route('/register').post(register);

userRouter.route('/login').post(checkEmail, checkPassword, signToken, login);

userRouter.route('/').get(auth, role(['admin']), getUsers);

module.exports = userRouter;
