const { Router } = require("express");
const { User } = require("../models");
const { hash, checkPassword, genToken, restrict } = require("../auth");

const usersRouter = Router();
const buildAuthResponse = user => {
  const token_data = {
    id: user.id,
    username: user.username,
    email: user.email
  };

  const token = genToken(token_data);
  const userData = {
    username: user.username,
    id: user.id,
    email: user.email
  };

  return {
    user: userData,
    token
  };
};

usersRouter.get("/verify", restrict, async (req, res) => {
  res.json({ user: res.locals.user });
});

usersRouter.post("/register", async (req, res, next) => {
  try {
    console.log("this is userRouter req.body", req.body);
    const { username, email, password } = req.body;
    const pw_digest = await hash(password);

    const user = await User.create({
      username,
      email,
      password_digest: pw_digest
    });
    const respData = buildAuthResponse(user);

    res.json({ ...respData });
  } catch (err) {
    next(err);
    console.log("did not register user");
    res.status(500).send(e.message);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //const digest = await hash(password);
    const user = await User.findOne({
      where: {
        email
      }
    });

    const isPassValid = await checkPassword(password, user.password_digest);
    if (isPassValid) {
      const { password_digest, ...userData } = user;
      console.log("ISPASSVALID : user", user);
      const respData = buildAuthResponse(user);
      res.json({ ...respData });
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});
module.exports = usersRouter;
