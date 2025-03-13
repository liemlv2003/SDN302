const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON body data

// File path for db.json
const dbPath = path.join(__dirname, 'db.json');

// Helper function to read and write data from db.json
const readDb = () => {
  const data = fs.readFileSync(dbPath);
  return JSON.parse(data);
};

const writeDb = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// GET route to fetch all articles
app.get('/articles', (req, res) => {
  const db = readDb();
  res.json(db.articles);
});

// GET route to fetch a single article by ID
app.get('/articles/:id', (req, res) => {
  const db = readDb();
  const article = db.articles.find(a => a.id === parseInt(req.params.id));
  if (!article) return res.status(404).json({ message: 'Article not found' });
  res.json(article);
});

// POST route to add a new article
app.post('/articles', (req, res) => {
  const db = readDb();
  const newArticle = req.body;
  newArticle.id = db.articles.length + 1; // Assign new ID
  db.articles.push(newArticle);
  writeDb(db);
  res.status(201).json({ message: 'Article created', article: newArticle });
});

// PUT route to update an article by ID
app.put('/articles/:id', (req, res) => {
  const db = readDb();
  const article = db.articles.find(a => a.id === parseInt(req.params.id));
  if (!article) return res.status(404).json({ message: 'Article not found' });

  article.title = req.body.title || article.title;
  article.content = req.body.content || article.content;

  writeDb(db);
  res.json({ message: 'Article updated', article });
});

// DELETE route to delete an article by ID
app.delete('/articles/:id', (req, res) => {
  const db = readDb();
  const articleIndex = db.articles.findIndex(a => a.id === parseInt(req.params.id));
  if (articleIndex === -1) return res.status(404).json({ message: 'Article not found' });

  db.articles.splice(articleIndex, 1);
  writeDb(db);
  res.json({ message: 'Article deleted' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
