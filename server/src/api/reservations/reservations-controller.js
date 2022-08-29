const { ReservationStatus } = require("../../model/enums");
const Reservation = require("../../model/Reservation");

const getReservations = async (req, res) => {
  const reservations = await Reservation.find({ user: req.user.id }).populate(
    "table"
  );

  return res.status(200).send(reservations);
};

const addReservation = async (req, res) => {
  const startDate = req.body.startDate ?? Date.now();
  const status = req.body.startDate
    ? ReservationStatus.PENDING
    : ReservationStatus.ACTIVE;
  const actions = [{ status, date: Date.now() }];

  const reservation = await Reservation.create({
    user: req.user.id,
    createdDate: Date.now(),
    startDate,
    table: req.body.table,
    client: req.body.client,
    status,
    actions,
  });

  return res.status(201).send(reservation);
};

module.exports = { getReservations, addReservation };
