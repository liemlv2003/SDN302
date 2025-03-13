const express = require('express');
const app = express();
const articleRouter = require('./routes/articleRouter');
const videoRouter = require('./routes/videoRouter');

app.use('/articles', articleRouter); // Routes for articles
app.use('/videos', videoRouter); // Routes for videos

// Centralized error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);  // Log the error stack for debugging
    res.status(err.status || 500).send({
        error: err.message || 'Internal Server Error'
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
