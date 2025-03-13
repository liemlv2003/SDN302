const express = require('express');
const validateArticle = require('./middlewares/validateArticle');

const app = express();
app.use(express.json());


app.post('articles', validateArticle, async (req,res) => {
    try {
        res.status(201).end('Will add the article: ' + req.body.title + ' with details: ' + req.body.text + ' and '+ req.body.date);
    } catch (error) {
        res.status(400).json({message: error.message});
        
    }
});

app.listen(3000, () => console.log('Server is running on port 3000'));

const validateDate = require('./middlewares/validateDate');

app.post('/articles', validateArticle, validateDate, (req, res) => {
  res.status(201).json({ message: 'Article with date validated successfully', article: req.body });
});

const validateTextLength = require('./middlewares/validateTextLength');

app.post(
  '/articles',
  validateArticle,
  validateDate,
  validateTextLength('title', 5, 100),
  (req, res) => {
    res.status(201).json({ message: 'Article with validated text length created successfully', article: req.body });
  }
);

