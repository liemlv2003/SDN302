const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON body data

// Read data from data.json
const readData = () => {
  const dataPath = path.join(__dirname, 'data.json');
  const rawData = fs.readFileSync(dataPath);
  return JSON.parse(rawData);
};

// Write data to data.json
const writeData = (data) => {
  const dataPath = path.join(__dirname, 'data.json');
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// GET route to fetch data
app.get('/data', (req, res) => {
  const data = readData();
  res.json(data);
});

// POST route to update data
app.post('/update', (req, res) => {
  const newData = req.body;
  const currentData = readData();
  
  // Update the current data with new values
  currentData.message = newData.message;
  
  // Write updated data back to file
  writeData(currentData);
  
  res.json({ message: 'Data updated successfully!', data: currentData });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
