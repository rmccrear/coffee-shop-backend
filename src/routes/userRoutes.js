const {
  register,
  login,
  getUsers,
  deleteOneUser,
  getOneUser,
  updateOneUser,
} = require('../controllers/userControllers');
const auth = require('../middleware/auth');
const { checkEmail, checkPassword, signToken } = require('../middleware/login');
const role = require('../middleware/role');

const userRouter = require('express').Router();

userRouter.route('/register').post(register);

userRouter.route('/login').post(checkEmail, checkPassword, signToken, login);

userRouter.route('/').get(auth, role(['admin']), getUsers);

userRouter
  .route('/:userId')
  .get(auth, role(['user', 'admin']), getOneUser)
  .delete(auth, role(['admin']), deleteOneUser)
  .put(auth, role(['user', 'admin']), updateOneUser);

module.exports = userRouter;
