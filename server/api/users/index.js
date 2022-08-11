const { AsyncRouter } = require("express-async-router");
const controller = require("./users-controller");
const { registerValidator, loginValidator } = require("./users-validation");

const router = AsyncRouter();

router.post("/register", registerValidator, controller.registerUser);
router.post("/login", loginValidator, controller.loginUser);

module.exports = router;
