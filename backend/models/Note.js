/**
 * Note Model
 *
 * Defines the structure of a note document in MongoDB
 * with automatic timestamps for creation and updates
 */

import mongoose from "mongoose";

/**
 * Note Schema
 *
 * Fields:
 * - title: String (required) - Note heading/title
 * - content: String (required) - Main note text
 * - createdAt: Date (auto) - When note was created
 * - updatedAt: Date (auto) - Last update timestamp
 */
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt fields
  },
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
