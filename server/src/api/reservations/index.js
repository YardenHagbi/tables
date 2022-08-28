const { AsyncRouter } = require("express-async-router");
const controller = require("./reservations-controller");
const { reservationValidator } = require("./reservations-validation");
const router = AsyncRouter();

router.get("/", controller.getReservations);
router.post("/", reservationValidator, controller.addReservation);

module.exports = router;
