const jwt = require("jsonwebtoken");

function authToken(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    req.user = jwt.verify(token, process.env.TOKEN_SECRET);
    next();
  } catch (error) {
    return res.status(403).send("Invalid Token");
  }
}

function authRole(roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return res.status(401).send("Not Allowed");
    }
    next();
  };
}

module.exports = { authToken, authRole };
