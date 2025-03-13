const express = require('express');
const app = express();
const articleRouter = require('./routes/articleRouter');
const videoRouter = require('./routes/videoRouter'); // Import the videoRouter

app.use('/articles', articleRouter); // Routes for articles
app.use('/videos', videoRouter); // Routes for videos

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
