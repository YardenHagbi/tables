const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const client = Joi.object({
  name: Joi.string(),
  phone: Joi.string(),
});

const reservationValidator = (req, res, next) => {
  const schema = Joi.object({
    startDate: Joi.date().greater("now"),
    table: Joi.objectId().required(),
    client: client,
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};

const reservationIdValidator = (req, res, next) => {
  const schema = Joi.object({
    reservationId: Joi.objectId().required(),
  });

  const { error } = schema.validate(req.params);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};

module.exports = { reservationValidator, reservationIdValidator };
