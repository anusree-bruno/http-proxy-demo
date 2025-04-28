const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Add colors for better visibility
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Enhanced logging middleware
app.use((req, res, next) => {
  console.log('\n' + colors.blue + '='.repeat(50) + colors.reset);
  console.log(colors.bright + 'NEW REQUEST RECEIVED' + colors.reset);
  console.log(colors.yellow + 'Method:' + colors.reset, req.method);
  console.log(colors.yellow + 'URL:' + colors.reset, req.url);
  console.log(colors.yellow + 'Headers:' + colors.reset);
  console.log(JSON.stringify(req.headers, null, 2));
  console.log(colors.yellow + 'Body:' + colors.reset);
  console.log(JSON.stringify(req.body, null, 2));
  console.log(colors.yellow + 'IP:' + colors.reset, req.ip);
  console.log(colors.yellow + 'Is Proxied:' + colors.reset, !!req.headers['x-forwarded-for']);
  if (req.headers['x-forwarded-for']) {
    console.log(colors.yellow + 'Original IP:' + colors.reset, req.headers['x-forwarded-for']);
  }
  console.log(colors.blue + '='.repeat(50) + colors.reset);
  next();
});

// Root endpoint
app.get('/', (req, res) => {
  console.log('==================================================');
  console.log('Processing root endpoint request');
  console.log('==================================================');
  res.json({
    message: 'Welcome to the Target Server',
    timestamp: new Date().toISOString(),
    isProxied: req.headers['x-forwarded-for'] ? true : false
  });
});

// Sample users endpoint
app.get('/api/users', (req, res) => {
  console.log(colors.green + 'Processing users endpoint request' + colors.reset);
  res.json([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ]);
});

// Echo endpoint
app.post('/api/echo', (req, res) => {
  console.log(colors.green + 'Processing echo endpoint request' + colors.reset);
  res.json({
    received: req.body,
    timestamp: new Date().toISOString()
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(colors.red + 'Error occurred:' + colors.reset, err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
    timestamp: new Date().toISOString()
  });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log('\n' + colors.blue + '='.repeat(50) + colors.reset);
  console.log(colors.bright + 'TARGET SERVER STARTED' + colors.reset);
  console.log(colors.yellow + 'Server running on:' + colors.reset, `http://localhost:${PORT}`);
  console.log(colors.yellow + 'Available endpoints:' + colors.reset);
  console.log(colors.cyan + '  GET  /' + colors.reset + '              - Returns welcome message');
  console.log(colors.cyan + '  GET  /api/users' + colors.reset + '     - Returns sample user data');
  console.log(colors.cyan + '  POST /api/echo' + colors.reset + '      - Echoes back request data');
  console.log(colors.blue + '='.repeat(50) + colors.reset + '\n');
}); 