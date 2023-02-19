var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
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
 * /login:
 *     post:
 *       summary: Log in
 *       tags: [Auth]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user logged in.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
router.post('/login', authController.login);


module.exports = router;