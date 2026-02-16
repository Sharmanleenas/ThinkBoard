/**
 * Notes Router
 *
 * Defines all RESTful endpoints for note operations
 * All routes prefixed with /api/notes
 */

import express from "express";
import {
  getAllNotes,
  createNote,
  updateNote,
  getNoteById,
  deleteNote,
} from "../controllers/notesController.js";

const router = express.Router();

/**
 * GET  /api/notes
 * Fetch all notes
 */
router.get("/", getAllNotes);

/**
 * POST /api/notes
 * Create new note
 * Body: { title: string, content: string }
 */
router.post("/", createNote);

/**
 * GET  /api/notes/:id
 * Get single note by ID
 */
router.get("/:id", getNoteById);

/**
 * PUT  /api/notes/:id
 * Update note by ID
 * Body: { title: string, content: string }
 */
router.put("/:id", updateNote);

/**
 * DELETE /api/notes/:id
 * Delete note by ID
 */
router.delete("/:id", deleteNote);

export default router;
