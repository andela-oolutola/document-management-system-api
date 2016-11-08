'use strict';

const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Get the token for request
  const token = req.body.token || req.headers['x-access-token'];

  if (token) {
    // TODO: reimplement secret for the application
    jwt.verify(token, 'superSecret', (err, decoded) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: 'Invalid token'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'Token not provided'
    });
  }
};

module.exports = auth;