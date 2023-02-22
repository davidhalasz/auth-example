const {body} = require('express-validator');

module.exports = [
    body('username', 'The username must be at least 3 characters!').isLength({min: 3}),
    body('email', 'The email address is not valid!').isEmail(),
    body('email', 'The email field cannot be empty!').notEmpty(),
    body('password', 'The password must be at least 7 characters!').isLength({min: 7}),
]