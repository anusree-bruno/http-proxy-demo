const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 9292;

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

// Echo endpoint that returns back the request data
app.all('*', (req, res) => {
  const response = {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
    query: req.query,
    ip: req.ip,
    timestamp: new Date().toISOString()
  };

  res.json(response);
});

// Start the server
app.listen(port, () => {
  console.log('==================================================');
  console.log('ECHO SERVER STARTED');
  console.log(`Server running on: http://localhost:${port}`);
  console.log('Available endpoints:');
  console.log('  ANY /* - Echoes back request data');
  console.log('==================================================');
}); 