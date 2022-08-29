const { AsyncRouter } = require("express-async-router");
const router = AsyncRouter();

//health
router.get("/health", (req, res) => res.send("I'm Alive"));

//routes
router.use("/user", require("./user"));

router.use(authToken);

module.exports = router;
