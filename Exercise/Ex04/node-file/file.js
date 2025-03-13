const fs = require('fs');

// Function to read data from JSON file
function readData() {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.log('Error reading file:', err);
            return;
        }
        console.log('File content:', data);
    });
}

// Function to write data to JSON file
function writeData(newData) {
    fs.writeFile('data.json', JSON.stringify(newData, null, 2), 'utf8', (err) => {
        if (err) {
            console.log('Error writing file:', err);
            return;
        }
        console.log('Data successfully written to file.');
    });
}

// Example usage
const sampleData = { name: 'John', age: 30 };
writeData(sampleData);  // Write data
readData();             // Read data