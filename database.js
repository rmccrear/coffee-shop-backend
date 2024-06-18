'use strict';
const mongoose = require('mongoose');
async function mongooseConnect() {
  await mongoose.connect(process.env.DB);
  console.log('Mongoose connected!');
}

module.exports = mongooseConnect;
