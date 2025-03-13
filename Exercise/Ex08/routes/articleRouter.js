const express = require('express');
const router = express.Router();

// Sample route that may cause an error
router.get('/', (req, res, next) => {
    try {
        // Simulating an error (e.g., trying to fetch articles from a database)
        throw new Error('Error fetching articles');
    } catch (error) {
        next(error);  // Propagate error to error-handling middleware
    }
});

router.get('/:id', (req, res, next) => {
    const articleId = req.params.id;
    if (!articleId) {
        const error = new Error('Article ID is required');
        error.status = 400;  // Bad Request
        return next(error);  // Propagate error to error-handling middleware
    }
    res.send(`Article details for ID: ${articleId}`);
});

module.exports = router;
