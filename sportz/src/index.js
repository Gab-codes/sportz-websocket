import express from "express";

const app = express();
const PORT = 8000;

// Use JSON middleware
app.use(express.json());

// Root GET route that returns a short message
app.get("/", (req, res) => {
  res.send({ message: "Hello from express server!" });
});

// Listen on port 8000 and log the URL when the server starts
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
