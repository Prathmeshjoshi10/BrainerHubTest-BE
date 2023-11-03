const User = require("../models/user.model");

exports.create = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(409).send({ error: "User already exists." });
    }

    const user = new User(req.body);
    const newUser = await user.save();
    const token = await user.generateAuthToken();

    res.status(201).send({ newUser, token });
  } catch (e) {
    res.status(400).send({
      error: e.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    if (user) res.status(200).send({ user: user, token: token });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};
