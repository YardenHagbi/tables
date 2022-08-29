const UserRole = {
  USER: 1,
  ADMIN: 2,
};

const UserSubscription = {
  TRIAL: 1,
  CUSTOMER: 2,
};

const ReservationStatus = {
  ACTIVE: 1,
  COMPLETED: 2,
  CANCELED: 3,
  PENDING: 4,
};

const Status = {
  ACTIVE: 1,
  INACTIVE: 2,
};

module.exports = { Status, UserRole, UserSubscription, ReservationStatus };
