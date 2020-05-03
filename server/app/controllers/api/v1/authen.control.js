const jwt = require('jsonwebtoken');
const UserModel = require('../../../../models/database/users.model');

const handleSignUp = async (req, res) => {
  const { username, password } = req.body;
  const usersQuery = await UserModel.find({ username });

  if (usersQuery.length > 0) return res.status(401).json('Username taken!!!');

  await new UserModel({ username, password }).save();

  return res.status(201).json({ message: 'Created new user sucessfully!!!' });
};

const handleSignIn = async (req, res) => {
  const { username, password } = req.body;
  const userQuery = await UserModel.findOne({ username });

  if (!userQuery) return res.status(409).json('username is not exist');
  if (userQuery.password !== password)
    return res.status(406).json({ message: 'Password wrong' });

  const token = jwt.sign(
    { id: userQuery._id, username: userQuery.username, elo: userQuery.elo },
    process.env.PRIVATE_KEY_JWT,
    { expiresIn: '12h' }
  );

  return res.status(202).json({ token });
};

module.exports = {
  handleSignIn,
  handleSignUp,
};
