const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const morgan = require('morgan');
const http = require('http');

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

const app = express();

// Enhanced logging middleware
app.use((req, res, next) => {
  console.log('\n' + colors.blue + '='.repeat(50) + colors.reset);
  console.log(colors.bright + 'PROXY REQUEST RECEIVED' + colors.reset);
  console.log(colors.yellow + 'Method:' + colors.reset, req.method);
  console.log(colors.yellow + 'URL:' + colors.reset, req.url);
  console.log(colors.yellow + 'Headers:' + colors.reset);
  console.log(JSON.stringify(req.headers, null, 2));
  console.log(colors.yellow + 'IP:' + colors.reset, req.ip);
  console.log(colors.blue + '='.repeat(50) + colors.reset + '\n');
  next();
});

// Standard logging with colors
app.use(morgan(colors.magenta + ':method :url :status :response-time ms' + colors.reset));

// Check if target server is available
const checkTargetServer = () => {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:8080', (res) => {
      resolve(res.statusCode === 200);
    });
    req.on('error', () => {
      resolve(false);
    });
    req.end();
  });
};

// Proxy configuration
const proxyOptions = {
  target: 'http://localhost:8080',
  changeOrigin: true,
  ws: true,
  pathRewrite: {
    '^/api': '',
  },
  onProxyReq: (proxyReq, req, res) => {
    // Add x-forwarded-for header
    proxyReq.setHeader('x-forwarded-for', req.ip);
    // Log the outgoing request
    console.log('\n' + colors.green + '='.repeat(50) + colors.reset);
    console.log(colors.bright + 'FORWARDING REQUEST TO TARGET' + colors.reset);
    console.log(colors.yellow + 'Method:' + colors.reset, proxyReq.method);
    console.log(colors.yellow + 'URL:' + colors.reset, proxyReq.path);
    console.log(colors.yellow + 'Headers:' + colors.reset);
    console.log(JSON.stringify(proxyReq.getHeaders(), null, 2));
    console.log(colors.green + '='.repeat(50) + colors.reset + '\n');
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log('\n' + colors.cyan + '='.repeat(50) + colors.reset);
    console.log(colors.bright + 'RESPONSE FROM TARGET' + colors.reset);
    console.log(colors.yellow + 'Status:' + colors.reset, proxyRes.statusCode);
    console.log(colors.yellow + 'Headers:' + colors.reset);
    console.log(JSON.stringify(proxyRes.headers, null, 2));
    console.log(colors.cyan + '='.repeat(50) + colors.reset + '\n');
  },
  onError: async (err, req, res) => {
    console.error(colors.red + 'Proxy Error:' + colors.reset, err);
    
    // Check if target server is available
    const isTargetAvailable = await checkTargetServer();
    
    if (!isTargetAvailable) {
      // Target server is not available
      res.status(503).json({
        error: 'Service Unavailable',
        message: 'Target server is not available',
        timestamp: new Date().toISOString(),
        details: {
          target: 'http://localhost:8080',
          error: err.message
        }
      });
    } else {
      // Other proxy error
      res.status(500).json({
        error: 'Proxy Error',
        message: 'An error occurred while processing your request',
        timestamp: new Date().toISOString(),
        details: {
          error: err.message
        }
      });
    }
  }
};

// Create the proxy
const proxy = createProxyMiddleware(proxyOptions);

// Apply proxy to all routes
app.use('/', proxy);

// Start the server
const PORT = 9292;
app.listen(PORT, 'localhost', () => {
  console.log('\n' + colors.blue + '='.repeat(50) + colors.reset);
  console.log(colors.bright + 'PROXY SERVER STARTED' + colors.reset);
  console.log(colors.yellow + 'Proxy running on:' + colors.reset, `http://localhost:${PORT}`);
  console.log(colors.yellow + 'Forwarding to:' + colors.reset, proxyOptions.target);
  console.log(colors.blue + '='.repeat(50) + colors.reset + '\n');
}); 