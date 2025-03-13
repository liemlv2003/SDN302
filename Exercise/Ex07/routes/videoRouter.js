const express = require('express');
const router = express.Router();

// Define the routes for videos
router.get('/', (req, res) => {
    res.send('List of all videos');
});

router.get('/:id', (req, res) => {
    res.send(`Details of video with ID: ${req.params.id}`);
});

router.post('/', (req, res) => {
    res.send('Create a new video');
});

router.put('/:id', (req, res) => {
    res.send(`Update video with ID: ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    res.send(`Delete video with ID: ${req.params.id}`);
});

module.exports = router;
