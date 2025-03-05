/**
 * Middleware to validate request body fields
 * @param {Array} requiredFields - Array of required field names
 * @returns {Function} Express middleware function
 */
const validateRequest = (requiredFields) => {
  return (req, res, next) => {
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        error: `Missing required fields: ${missingFields.join(', ')}` 
      });
    }
    
    next();
  };
};

module.exports = {
  validateRequest
};