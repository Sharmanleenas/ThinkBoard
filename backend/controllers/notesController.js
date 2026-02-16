/**
 * Notes Controller
 *
 * Handles all business logic for note operations:
 * - Fetch all notes with sorting
 * - Fetch single note by ID
 * - Create new note
 * - Update existing note
 * - Delete note
 */

import Note from "../models/Note.js";

/**
 * GET all notes
 * Fetches all notes from database sorted by newest first
 * @route GET /api/notes
 * @returns {Array} Array of all notes sorted by createdAt (descending)
 */
export const getAllNotes = async (_, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("❌ Error in getAllNotes:", error);
    res.status(500).json({
      message: "Error fetching notes",
      error: error.message,
    });
  }
};

/**
 * GET single note by ID
 * Fetches a specific note for viewing/editing
 * @route GET /api/notes/:id
 * @param {string} id - Note MongoDB ID
 * @returns {Object} Single note object or 404 if not found
 */
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("❌ Error in getNoteById:", error);
    res.status(500).json({
      message: "Error fetching note",
      error: error.message,
    });
  }
};

/**
 * POST - Create new note
 * Validates input and saves to database
 * @route POST /api/notes
 * @body {string} title - Note title (required, max 200 chars)
 * @body {string} content - Note content (required)
 * @returns {Object} Created note with _id and timestamps
 */
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Input validation
    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Title is required",
      });
    }
    if (!content || !content.trim()) {
      return res.status(400).json({
        message: "Content is required",
      });
    }

    const newNote = new Note({
      title: title.trim(),
      content: content.trim(),
    });

    const savedNote = await newNote.save();

    res.status(201).json({
      message: "Note created successfully",
      data: savedNote,
    });
  } catch (error) {
    console.error("❌ Error in createNote:", error);
    res.status(500).json({
      message: "Error creating note",
      error: error.message,
    });
  }
};

/**
 * PUT - Update existing note
 * Validates input and updates database
 * @route PUT /api/notes/:id
 * @param {string} id - Note MongoDB ID
 * @body {string} title - Updated title
 * @body {string} content - Updated content
 * @returns {Object} Updated note object
 */
export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Input validation
    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Title is required",
      });
    }
    if (!content || !content.trim()) {
      return res.status(400).json({
        message: "Content is required",
      });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title: title.trim(), content: content.trim() },
      { new: true, runValidators: true },
    );

    if (!updatedNote) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json({
      message: "Note updated successfully",
      data: updatedNote,
    });
  } catch (error) {
    console.error("❌ Error in updateNote:", error);
    res.status(500).json({
      message: "Error updating note",
      error: error.message,
    });
  }
};

/**
 * DELETE - Remove note
 * Finds and deletes note from database
 * @route DELETE /api/notes/:id
 * @param {string} id - Note MongoDB ID
 * @returns {Object} Success message
 */
export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error("❌ Error in deleteNote:", error);
    res.status(500).json({
      message: "Error deleting note",
      error: error.message,
    });
  }
};
