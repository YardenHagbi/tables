const { AsyncRouter } = require("express-async-router");
const router = AsyncRouter();

router.use("/users", require("./users"));

module.exports = router;
