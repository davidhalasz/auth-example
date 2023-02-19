var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');
const {  validationResult} = require('express-validator');
const authValidator = require('./validators/authValidator');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send(errors);
      return;
    }
    next();
};

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required: true
 *       properties:
 *         email:
 *           type: string
 *           description: The user's email address
 *         password:
 *           type: string
 *           description: The user's passsword
 *       example:
 *         email: email@email.com
 *         password: password123
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The Authentication managing API
 * /api/auth/login:
 *   post:
 *     summary: Log in
 *     tags: [Auth]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user logged in.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 *       400:
 *         description: Validation exception
 */
router.post('/login', authValidator, validateRequest, authController.login);

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The Authentication managing API
 * /api/auth/register:
 *   post:
 *     summary: User registration
 *     tags: [Auth]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user registered.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 *       401:
 *         description: Validation exception
 *       402:
 *         description: The email was taken
 */
router.post('/register', authValidator, validateRequest, authController.createUser);


module.exports = router;