/* eslint-disable import/no-extraneous-dependencies */
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = async (password) => {
  const hashed = await argon2
    .hash(password, hashingOptions)
    .then((hashedPassword) => {
      return hashedPassword;
    })
    .catch((err) => {
      console.warn(err);
      return false;
    });
  return hashed;
};

const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.password, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        const payload = {
          sub: { id: req.user.id, name: req.user.name },
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "2h",
        });
        delete req.user.password;

        res.send({ token, user: req.user });
      } else {
        return res.sendStatus(401);
      }
      return null;
    })
    .catch((err) => {
      console.error(err);
      return res.sendStatus(500);
    });
};

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");
    if (authorizationHeader === null) {
      throw new Error("Authorization header is missing");
    }
    const [type, token] = authorizationHeader.split(" ");
    if (type !== "Bearer") {
      throw new Error("Authorization header has not the bearer type");
    }
    req.payload = jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (err) {
    res.sendStatus(403);
  }
};

module.exports = { verifyPassword, hashPassword, verifyToken };
