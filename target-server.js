const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

// Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Log all incoming requests
app.use((req, res, next) => {
  console.log('==================================================');
  console.log('NEW REQUEST RECEIVED');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Body:', JSON.stringify(req.body, null, 2));
  console.log('IP:', req.ip);
  console.log('Is Proxied:', !!req.headers['x-forwarded-for']);
  console.log('==================================================');
  next();
});

// Root endpoint
app.get('/', (req, res) => {
  console.log('Processing root endpoint request');
  res.json({
    message: 'Welcome to the Target Server',
    timestamp: new Date().toISOString()
  });
});

// Sample API endpoint
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ]);
});

// Echo endpoint
app.post('/api/echo', (req, res) => {
  res.json({
    message: 'Request received',
    data: req.body,
    headers: req.headers,
    timestamp: new Date().toISOString()
  });
});

// Start the server
app.listen(port, () => {
  console.log('==================================================');
  console.log('TARGET SERVER STARTED');
  console.log(`Server running on: http://localhost:${port}`);
  console.log('Available endpoints:');
  console.log('  GET  /              - Returns welcome message');
  console.log('  GET  /api/users     - Returns sample user data');
  console.log('  POST /api/echo      - Echoes back request data');
  console.log('==================================================');
}); 