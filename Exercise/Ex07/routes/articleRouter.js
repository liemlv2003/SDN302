const express = require('express');
const router = express.Router();

// Define the routes for articles
router.get('/', (req, res) => {
    res.send('List of all articles');
});

router.get('/:id', (req, res) => {
    res.send(`Details of article with ID: ${req.params.id}`);
});

router.post('/', (req, res) => {
    res.send('Create a new article');
});

router.put('/:id', (req, res) => {
    res.send(`Update article with ID: ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    res.send(`Delete article with ID: ${req.params.id}`);
});

module.exports = router;
