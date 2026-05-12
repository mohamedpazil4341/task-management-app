// ============================================
// JWT Token Generator
// ============================================
// Creates a signed JSON Web Token for authenticated users.
// The token contains the user's ID and expires in 30 days.

const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expires in 30 days
  });
};

module.exports = generateToken;
