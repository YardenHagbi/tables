const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access Denied");

  try {
    //Set user credentials
    req.user = jwt.verify(token, process.env.TOKEN_SECRET);
    next();
  } catch (error) {
    return res.status(403).send("Invalid Token");
  }
};

const authRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return res.status(401).send("Not Allowed");
    }
    next();
  };
};

module.exports = { authToken, authRole };
