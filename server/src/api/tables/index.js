const { AsyncRouter } = require("express-async-router");
const controller = require("./tables-controller");
const { tableValidator, tableIdValidator } = require("./tables-validation");

const router = AsyncRouter();

router.get("/", controller.getTables);
router.post("/", tableValidator, controller.addTable);
router.put(
  "/:tableId",
  tableValidator,
  tableIdValidator,
  controller.updateTable
);
router.delete("/:tableId", tableIdValidator, controller.deleteTable);

module.exports = router;
