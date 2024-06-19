const jwt = require("jsonwebtoken");

const checkAuth =
  (shouldThrow = true) =>
  (req, res, next) => {
    const header = req.headers.authorization;

    // Bearer <token> ["Beaer", "token"]
    const token = header.split(" ")[1];

    if (!token && shouldThrow) {
      return res.status(402).json({ error: "Not authenticated" });
    }

    let userData;

    try {
      userData = jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (error) {
      console.log(error);
      return res.json({ error: "Token expired" }).status(400);
    }

    req.userId = userData.userId;
    req.age = userData.age;

    next();
  };

module.exports = checkAuth;
