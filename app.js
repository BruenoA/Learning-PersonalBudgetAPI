const express = require('express');
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api');
const cors = require('cors');
const swagger = require('swagger-jsdoc');
const swaggerUi = require("swagger-ui-express");

dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('tiny'));

app.use('/api/v2', apiRouter);

//Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Portfolio Budget II",
      version: "1.0.0",
      description:
        "Simple backend API to manage portfolio budget using an envelope budgeting method. Built with Postgresql, Express, and Node. Author: unitoflazy",
    },
  },
  apis: ["./routes/api.js"],
};
const specs = swagger(swaggerOptions);

app.use("/api-docs", swaggerUi.serve);
app.get(
  "/api-docs",
  swaggerUi.setup(specs, {
    explorer: true,
  })
);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

