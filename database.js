'use strict';
const mongoose = require('mongoose');
async function mongooseConnect() {
  await mongoose.connect(process.env.MONGO_DB_URI);
  console.log('Mongoose connected!');
}

module.exports = mongooseConnect;
