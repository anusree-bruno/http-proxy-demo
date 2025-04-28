# Proxy Server Test Environment

This project provides a test environment for testing proxy server functionality, particularly useful for debugging and testing API clients like Bruno. It includes three main components:

1. **Proxy Server** (`index.js`) - Acts as an intermediary between clients and target servers
2. **Target Server** (`target-server.js`) - Simulates a real API server
3. **Echo Server** (`echo-server.js`) - Returns back request data for debugging

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the servers:

- To start the target server (runs on port 8080):
```bash
npm start
```

- To start the echo server (runs on port 9292):
```bash
npm run start:echo
```

## Components

### Proxy Server (`index.js`)
- Runs on port 9292
- Forwards requests to the target server
- Adds `x-forwarded-for` headers
- Provides detailed request/response logging
- Handles proxy errors gracefully

### Target Server (`target-server.js`)
- Runs on port 8080
- Provides sample API endpoints:
  - `GET /` - Welcome message
  - `GET /api/users` - Sample user data
  - `POST /api/echo` - Echoes back request data
- Logs all incoming requests

### Echo Server (`echo-server.js`)
- Runs on port 9292
- Returns back all request data including:
  - Method
  - URL
  - Headers
  - Body
  - Query parameters
  - IP address
  - Timestamp

## Use Cases

1. **Testing Proxy Configuration**
   - Verify proxy settings in API clients
   - Test proxy authentication
   - Debug proxy connection issues

2. **Request/Response Inspection**
   - See exactly what data is being sent/received
   - Verify headers and body content
   - Check for proxy-specific headers

3. **Error Handling Testing**
   - Test how clients handle proxy errors
   - Verify error messages and status codes
   - Test connection timeout scenarios

4. **Development and Debugging**
   - Local development without external dependencies
   - Consistent testing environment
   - Detailed logging for troubleshooting

## Example Usage with Bruno

1. Configure Bruno to use the proxy:
   - Proxy URL: `http://localhost:9292`
   - Target URL: `http://localhost:8080`

2. Send requests through the proxy to see:
   - Request modifications
   - Response handling
   - Error scenarios

## Troubleshooting

If you encounter issues:

1. Check if ports 8080 and 9292 are available
2. Verify all servers are running
3. Check the detailed logs in each server's console
4. Ensure proper proxy configuration in your client

## License

MIT 