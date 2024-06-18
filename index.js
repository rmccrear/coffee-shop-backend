'use strict';

const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3002;
const cors = require('cors');
const baseRouter = require('./src/routes/baseRoutes');
const { error } = require('./src/middleware/error');
const mongooseConnect = require('./database');
app.use(express.json());
app.use(cors());
app.use(baseRouter);

mongooseConnect().catch((err) => console.error(err));
app.use(error);
app.listen(PORT, () => {
  console.log('Server running on port: ' + PORT);
});
