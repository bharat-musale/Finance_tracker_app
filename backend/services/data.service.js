const fs = require('fs');
const path = require('path');

// Get absolute path to data file
const dataPath = path.join(__dirname, '..', 'data', 'data.json');
console.log('Data file path:', dataPath);

function ensureDirectoryExists() {
  const dir = path.dirname(dataPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log('Created directory:', dir);
  }
}

function initializeDataFile() {
  if (!fs.existsSync(dataPath)) {
    const initialData = {
      transactions: [],
      budgets: []
    };
    fs.writeFileSync(dataPath, JSON.stringify(initialData, null, 2), 'utf8');
    console.log('Initialized data file');
  }
}

// Ensure directory and file exist
ensureDirectoryExists();
initializeDataFile();

function readData() {
  try {
    console.log('Reading data from:', dataPath);
    if (!fs.existsSync(dataPath)) {
      console.log('Data file not found, creating new one');
      initializeDataFile();
    }
    const rawData = fs.readFileSync(dataPath, 'utf8');
    console.log('Raw data read:', rawData);
    const data = JSON.parse(rawData);
    return {
      transactions: Array.isArray(data.transactions) ? data.transactions : [],
      budgets: Array.isArray(data.budgets) ? data.budgets : []
    };
  } catch (error) {
    console.error('Error reading data:', error);
    return { transactions: [], budgets: [] };
  }
}

function writeData(data) {
  try {
    console.log('Writing data to:', dataPath);
    console.log('Data to write:', JSON.stringify(data, null, 2));
    
    // Ensure the data structure is correct
    const sanitizedData = {
      transactions: Array.isArray(data.transactions) ? data.transactions : [],
      budgets: Array.isArray(data.budgets) ? data.budgets : []
    };

    // Make sure the directory exists before writing
    ensureDirectoryExists();
    
    // Write the file synchronously
    fs.writeFileSync(dataPath, JSON.stringify(sanitizedData, null, 2), 'utf8');
    console.log('Data written successfully');
    return true;
  } catch (error) {
    console.error('Error writing data:', error);
    throw error;
  }
}

module.exports = {
  readData,
  writeData
};
