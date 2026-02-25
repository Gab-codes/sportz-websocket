import express from "express";
import { matchRouter } from "./routes/matches.js";
import http from "http";
import { attachWebSocketServer } from "./ws/server.js";
import { securityMiddleware } from "./arcjet.js";
import { commentaryRouter } from "./routes/commentary.js";

const app = express();
const PORT = Number(process.env.PORT || 8000);
const HOST = process.env.HOST || "0.0.0.0";

// Use JSON middleware
app.use(express.json());
const server = http.createServer(app);

// Root GET route that returns a short message
app.get("/", (req, res) => {
  res.send({ message: "Hello from express server!" });
});

app.use(securityMiddleware());

app.use("/matches", matchRouter);
app.use("/matches/:id/commentary", commentaryRouter);

const { broadcastMatchCreated, broadcastCommentary } =
  attachWebSocketServer(server);
app.locals.broadcastMatchCreated = broadcastMatchCreated;
app.locals.broadcastCommentary = broadcastCommentary;

// Listen on port 8000 and log the URL when the server starts
server.listen(PORT, HOST, () => {
  const baseUrl =
    HOST === "0.0.0.0" ? `http://localhost:${PORT}` : `http://${HOST}:${PORT}`;
  console.log(`Server is running on ${baseUrl}`);
  console.log(
    `WebSocket Server is running on ${baseUrl.replace("http", "ws")}/ws`,
  );
});
