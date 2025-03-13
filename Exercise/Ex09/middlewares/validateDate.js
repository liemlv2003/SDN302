// validateDate.js
const validateDate = (req, res, next) => {
    const { date } = req.body;
  
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Matches YYYY-MM-DD format
  
    if (!date || !dateRegex.test(date)) {
      return res.status(400).json({ error: 'Date is required and must be in YYYY-MM-DD format' });
    }
  
    next(); // Pass control to the next middleware
  };
  
  module.exports = validateDate;
  