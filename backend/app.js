const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth.js");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://localhost:27017/AuthDb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

try {
  connection.once("open", () => {
    console.log("database connected successfully...");
  });
} catch (error) {
  console.log("connection failed...");
}

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Auth example API with Swagger",
      version: "1.0.1",
      description:
        "This is a simple authentication API made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
    },
    servers: [
      {
        url: "http://localhost:9000",
      },
    ],
  },
  apis: [path.join(__dirname, "/routes/*.js")],
};

var app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:9000"],
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.use(function (req, res, next) {
  next(createError(404));
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);

module.exports = app;
