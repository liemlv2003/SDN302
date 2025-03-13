
const validateTextLength = (field, minLength, maxLength) => {
    return (req, res, next) => {
      const value = req.body[field];
  
      if (!value || typeof value !== 'string' || value.length < minLength || value.length > maxLength) {
        return res.status(400).json({
          error: `${field} must be a string between ${minLength} and ${maxLength} characters`,
        });
      }
  
      next(); 
    };
  };
  
  module.exports = validateTextLength;
  