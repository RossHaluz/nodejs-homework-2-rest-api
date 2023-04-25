const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers/HttpError");

const auth = async (req, res, next) => {
  const authHeasder = req.headers.authorization || "";
  if (!authHeasder) {
    next(HttpError(401, "Not authorized"));
  }
  const [bearer, token] = await authHeasder.split(" ", 2);
  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      next(HttpError(401, "Not authorized"));
    }
    req.user = decoded;

    next();
  });
};

module.exports = auth;
