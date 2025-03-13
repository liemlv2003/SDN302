// Import the Express module
const express = require('express');
const app = express();  // Create an instance of Express

// Define a simple route for the root path
app.get('/', (req, res) => {
    res.send('Hello, Express!');  // Respond with "Hello, Express!" message
});

// Set the port for the server to listen on
const PORT = 3000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
