const { Router } = require("express");
const { User } = require("../models");
const { hash, checkPassword, genToken, restrict } = require("../auth");

const usersRouter = Router();
const buildAuthResponse = user => {
  const token_data = {
    id: user.id,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    isLocal: user.isLocal
  };

  const token = genToken(token_data);
  const userData = {
    username: user.username,
    id: user.id,
    email: user.email,
    avatar: user.avatar,
    isLocal: user.isLocal
  };

  return {
    user: userData,
    token
  };
};

usersRouter.get("/verify", async (req, res) => {
  res.json({ user: res.locals.user });
});

usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, email, password, avatar, isLocal } = req.body;
    const pw_digest = await hash(password);

    const user = await User.create({
      username,
      email,
      isLocal,
      avatar,
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

usersRouter.put("/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    const newUser = await user.update(req.body);
    console.log("newUser", newUser);
    res.json({ newUser });
  } catch (e) {
    next(e);
  }
});

// favorite station
usersRouter.get('/:id/favorites', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    const favorite = await user.getStations();
    res.json(favorite)
  } catch (e) {
    next(e)
  }
});

module.exports = usersRouter;
