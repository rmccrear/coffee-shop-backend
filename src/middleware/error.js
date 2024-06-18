'use strict';

function error(err, req, res, next) {
  res.status(500).json({ error: err.message });
}
module.exports = { error };
