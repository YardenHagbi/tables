const { Status } = require("../../model/enums");
const Table = require("../../model/Table");

const getTables = async (req, res) => {
  const tables = await Table.find({ user: req.user.id }).populate(
    "reservations"
  );

  return res.status(200).send(tables);
};

const addTable = async (req, res) => {
  const table = await Table.create({
    user: req.user.id,
    createdDate: Date.now(),
    name: req.body.name,
    section: req.body.section,
    defaultPrice: req.body.defaultPrice,
    status: Status.ACTIVE,
  });

  return res.status(201).send(table);
};

const updateTable = async (req, res) => {
  const table = await Table.findByIdAndUpdate(req.params.tableId, {
    name: req.body.name,
    section: req.body.section,
    defaultPrice: req.body.defaultPrice,
  });

  return res.status(200).send(table);
};

const deleteTable = async (req, res) => {
  //Disable table
  await Room.findByIdAndUpdate(req.params.tableId, { active: false });

  return res.sendStatus(204);
};

module.exports = { getTables, addTable, updateTable, deleteTable };
