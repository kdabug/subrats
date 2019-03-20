const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require('./models');
const SALT = 11;
const TOKENKEY = "spicy password";

// encrypts password on register
const hash = async password => {
  const digest = await bcrypt.hash(password, SALT);
  return digest;
};

//generates token on login/register
const genToken = data => {
  const token = jwt.sign(data, TOKENKEY);
  return token;
};

// used on login to verify user
const checkPassword = async (password, password_digest) => {
  return await bcrypt.compare(password, password_digest);
};

// middleware used to verify user on routes
const restrict = async (req, res, next) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    const data = await jwt.verify(token, TOKENKEY);
    const user = await User.findByPk(data.id);
    res.locals.user = data;
    next();
  } catch (e) {
    console.log(e);
    console.log(req);
    res.status(403).send("Unauthorized");
  }
};

module.exports = {
  hash,
  checkPassword,
  genToken,
  restrict
};
