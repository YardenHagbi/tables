const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const tableValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    section: Joi.string(),
    defaultPrice: Joi.number(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};

const tableIdValidator = (req, res, next) => {
  const schema = Joi.object({
    tableId: Joi.objectId().required(),
  });

  const { error } = schema.validate(req.params);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};

module.exports = { tableValidator, tableIdValidator };
