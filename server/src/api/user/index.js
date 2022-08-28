const { AsyncRouter } = require("express-async-router");
const controller = require("./user-controller");
const { authToken } = require("../../middleware/auth");
const {
  registerValidator,
  loginValidator,
  updateUserValidator,
} = require("./user-validation");

const router = AsyncRouter();

router.get("/", authToken, controller.getUserFromToken);
router.put("/", authToken, updateUserValidator, controller.updateUser);
router.post("/login", loginValidator, controller.loginUser);
router.post("/register", registerValidator, controller.registerUser);

module.exports = router;
