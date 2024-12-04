const { body, validationResult } = require("express-validator");

const toUpBalance = [
  body("top_up_amount")
    .not()
    .isEmpty()
    .withMessage("top_up_amount is required")
    .isFloat()
    .withMessage("top_up_amount must be a number"),
];

const topUpTransaction = [
  body("service_code")
    .not()
    .isEmpty()
    .withMessage("service_code is required")
    .isString()
    .withMessage("service_code must be a string"),
];

const validateResults = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  next();
};

module.exports = { toUpBalance, topUpTransaction, validateResults };
