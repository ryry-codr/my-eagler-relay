import http from 'http';
import express from 'express';
import { EaglerSPRelay } from 'eaglerrelayjs';

const app = express();
const server = http.createServer(app);

// This initializes the core Eaglercraft singleplayer matchmaking code
const relay = new EaglerSPRelay({ debug: true });

// Basic health check endpoint so Render knows the app is alive
app.use((req, res) => {
  res.set('Content-Type', 'text/plain');
  res.status(200).end('Relay is running smoothly!');
});

// This line handles upgrading your standard web request into an Eaglercraft WebSocket
server.on('upgrade', (req, socket, head) => relay.handleUpgrade(req, socket, head));

// This dynamically hooks into the port Render assigns to your service
const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Eaglercraft Relay active on port ${port}`);
});
