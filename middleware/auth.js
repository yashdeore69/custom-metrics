// Simple authentication middleware for protected routes
// Allows requests with header: Authorization: Bearer CURSORPROTOTYPE
module.exports = (req, res, next) => {
  const header = req.headers['authorization'];
  if (header === 'Bearer CURSORPROTOTYPE') return next();
  return res.status(401).json({ success: false, message: 'Unauthorized' });
}; 