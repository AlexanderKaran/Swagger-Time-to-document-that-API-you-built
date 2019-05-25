"use strict";
// Node Modules
const express = require("express");
const router = express.Router();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// App Modules
const User = require("../Models/User");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * path:
 *  /users/:
 *    post:
 *      summary: Create a new user
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
router.post("/users", (req, res, next) => {
  const { email, name } = req.body;
  const user = new User(name, email);
  res.json(user);
});

/**
 * @swagger
 * path:
 *  /users/:
 *    get:
 *      summary: Get all users
 *      tags: [Users]
 *      responses:
 *        "200":
 *          description: An array of users
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
router.get("/users", (req, res, next) => {
  const userOne = new User("Alexander", "fake@gmail.com");
  const userTwo = new User("Ryan", "fakeagain@gmail.com");
  res.json({ userOne, userTwo });
});

// Swagger set up
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Time to document that Express API you built",
      version: "1.0.0",
      description:
        "A test project to understand how easy it is to document and Express API",
      license: {
        name: "MIT",
        url: "https://choosealicense.com/licenses/mit/"
      },
      contact: {
        name: "Swagger",
        url: "https://swagger.io",
        email: "Info@SmartBear.com"
      }
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1"
      }
    ]
  },
  apis: ["./Models/User.js", "./Routes/index.js"]
};
const specs = swaggerJsdoc(options);
router.use("/docs", swaggerUi.serve);
router.get("/docs", swaggerUi.setup(specs, { explorer: true }));

// catch 404 and forward to error handler
router.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error Handler
router.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

module.exports = router;
