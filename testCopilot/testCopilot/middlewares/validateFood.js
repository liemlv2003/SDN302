//"Write an Express middleware to validate a POST request for a food item. Fields: name (required, string), price (required, positive number), category (required, one of ['Beverage', 'Main Course', 'Dessert'])." 
const validateFood = (req, res, next) => {
    const { name, price, category } = req.body;
    const validCategories = ['Beverage', 'Main Course', 'Dessert'];

    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'Name is required and must be a string.' });
    }
    if (!price || typeof price !== 'number' || price <= 0) {
        return res.status(400).json({ error: 'Price is required and must be a positive number.' });
    }
    if (!category || !validCategories.includes(category)) {
        return res.status(400).json({ error: `Category must be one of ${validCategories.join(', ')}` });
    }
    next();
};

module.exports = validateFood;
