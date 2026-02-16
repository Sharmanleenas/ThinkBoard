import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

// Internal Imports
import notesRouter from "./routes/notesRouter.js";
import rateLimiter from "./middleware/rateLimiter.js";
import connectDB from "./config/db.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

/* -----------------------------
    Middleware
------------------------------*/

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.CLIENT_URL
        : "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

// Custom Logger
app.use((req, res, next) => {
  console.log(`📌 ${req.method} | ${req.url}`);
  next();
});

// Rate Limiter applied to API routes
app.use("/api", rateLimiter);

/* -----------------------------
    API Routes
------------------------------*/

app.use("/api/notes", notesRouter);

/* -----------------------------
    Production Setup (SPA Serving)
------------------------------*/

if (process.env.NODE_ENV === "production") {
  // FIX: Go up one level (..) to find the frontend folder from backend/server.js
  const frontendPath = path.join(__dirname, "..", "frontend", "dist");

  app.use(express.static(frontendPath));

  // FIX: The only wildcard syntax that reliably works in Express 5.0 for SPAs
  // This tells Express: "If the route doesn't start with /api,
  // and it's not a static file, send the React index.html"
  app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.status(200).send("🚀 ThinkBoard API is running in development mode...");
  });
}

/* -----------------------------
    Global Error Handler
------------------------------*/

app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

/* -----------------------------
    Start Server
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
