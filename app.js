const express = require('express');
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api');
// const cors = require('cors');
// const { pool } = require('./db/index');

// const envelopes = require('./db/db.js');

dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT || 8000;

const app = express();

// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('tiny'));

app.use('/api/v1', apiRouter);


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

