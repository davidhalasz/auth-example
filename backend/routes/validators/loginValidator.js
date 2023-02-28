const {body} = require('express-validator');

module.exports = [
    body('email', 'The email address is not valid!').isEmail(),
    body('email', 'The email field cannot be empty!').notEmpty(),
    body('password', 'The password field is required!').isLength({min: 1}),
]