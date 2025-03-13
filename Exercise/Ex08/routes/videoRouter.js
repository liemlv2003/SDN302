const express = require('express');
const router = express.Router();

// Sample route that may cause an error
router.get('/', (req, res, next) => {
    try {
        // Simulating an error (e.g., trying to fetch videos from a database)
        throw new Error('Error fetching videos');
    } catch (error) {
        next(error);  // Propagate error to error-handling middleware
    }
});

router.get('/:id', (req, res, next) => {
    const videoId = req.params.id;
    if (!videoId) {
        const error = new Error('Video ID is required');
        error.status = 400;  // Bad Request
        return next(error);  // Propagate error to error-handling middleware
    }
    res.send(`Video details for ID: ${videoId}`);
});

module.exports = router;
