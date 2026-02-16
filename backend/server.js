import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRouter from "./routes/notesRouter.js";
import rateLimiter from "./middleware/rateLimiter.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* -----------------------------
   Middleware
------------------------------*/

// Enable CORS (frontend running on Vite default port)
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

// Parse JSON
app.use(express.json());

// Custom Request Logger
app.use((req, res, next) => {
  console.log(`📌 ${req.method} | ${req.url}`);
  next();
});

// Rate Limiter
app.use(rateLimiter);

/* -----------------------------
   Routes
------------------------------*/

app.use("/api/notes", notesRouter);

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).send("🚀 Backend API is running...");
});

/* -----------------------------
   Global Error Handler
------------------------------*/

app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

/* -----------------------------
   Start Server After DB Connect
------------------------------*/

const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to DB:", error.message);
    process.exit(1);
  }
};

startServer();

/**
 * ================================
 * ThinkBoard Backend Server
 * ================================
 *
 * Features:
 * - Express.js API server for note management
 * - MongoDB database connection
 * - CORS enabled for frontend communication
 * - Rate limiting via Upstash Redis
 * - Request logging middleware
 * - Global error handling
 *
 * Routes:
 * - GET  /api/notes        - Fetch all notes
 * - POST /api/notes        - Create new note
 * - GET  /api/notes/:id    - Fetch single note
 * - PUT  /api/notes/:id    - Update note
 * - DELETE /api/notes/:id  - Delete note
 */
