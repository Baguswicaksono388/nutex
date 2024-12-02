const { body, validationResult } = require('express-validator');

// Validator untuk login
const singUp = [
  body('email').not().isEmpty().withMessage('Email is required').isEmail().withMessage('Paramter email tidak sesuai format'),
  body('first_name').not().isEmpty().withMessage('First Name is required'),
  body('last_name').not().isEmpty().withMessage('Last Name is required'),
  body('password').not().isEmpty().withMessage('Password is required').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
];

const login = [
  body('email').not().isEmpty().withMessage('Email is required').isEmail().withMessage('Paramter email tidak sesuai format'),
  body('password').not().isEmpty().withMessage('Password is required').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
]


const validateResults = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if(errors.array()[0].param === 'email') {
        return res.status(400).json({
            status: 102,
            message: errors.array()[0].msg,
            data: null
        })
    }

    return res.status(400).json({
      errors: errors.array(),
    });
  }
  next();
};

module.exports = { singUp, login, validateResults };