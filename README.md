# 🚀 Simple HTTP Proxy Playground

Hey there! 👋 This is a test environment for playing around with proxy server stuff. Here's what we've got:

1. 🎯 **Target Server** - Your API server (port 8080)
2. 🔄 **Proxy Server** - The middleman that forwards your requests (port 9292)

## 🚀 Getting Started

First things first:
```bash
npm install
```

Then open up two terminal windows and run:

```bash
# Terminal 1: Start the target server
npm start

# Terminal 2: Start the proxy server
npm run start:proxy
```

## 🛠 What's Inside?

### 🎯 Target Server
- Lives on port 8080
- Has two simple endpoints:
  - `GET /` - Says hello!
  - `GET /api/users` - Gives you some sample user data

### 🔄 Proxy Server
- Hangs out on port 9292
- Forwards your requests to the target
- Adds some helpful headers
- Shows detailed logs so you know what's happening

## 🧪 Try It Out!

1. Start both servers
2. Try hitting the target directly:
```bash
curl http://localhost:8080
```
You'll see it wasn't proxied!

3. Now go through the proxy:
```bash
curl -x http://localhost:9292 http://localhost:8080
```
Now you'll see it was proxied! ✨

## 🆘 Running into Issues?

No worries! Here's what to check:
1. Are ports 8080 and 9292 free? Something else might be using them
2. Both servers running? Check those terminal windows
3. Look at the logs - they'll tell you what's happening
4. Double-check your proxy settings if you're using a client
