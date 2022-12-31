const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomAPIError("pls provide email and password", 400);
  }

  // for demo only
  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res
    .status(200)
    .json(
      { msg: `hi ${req.user.username}`, secret: `Your lucky no ${luckyNumber}`  }
    );
};

module.exports = {
  login,
  dashboard,
};
