const { AsyncRouter } = require("express-async-router");
const router = AsyncRouter();

router.get("/health", (req, res) => res.send("I'm Alive"));

router.use("/user", require("./user"));

router.use(authToken);

module.exports = router;
