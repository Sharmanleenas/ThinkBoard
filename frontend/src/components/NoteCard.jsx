import { PenSquare, Trash2Icon } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../lib/utils";
import toast from "react-hot-toast";
import api from "../lib/axios"; // ✅ Use centralized API instance

/**
 * Note Card Component
 *
 * Features:
 * - Display individual note as clickable card
 * - Delete note with confirmation
 * - Navigate to note detail page on click
 * - Format and display creation date
 * - Edit button (links to detail page for editing)
 *
 * Props:
 * - note: Note object with _id, title, content, createdAt
 * - setNotes: State setter function to update parent notes list
 */

const NoteCard = ({ note, setNotes }) => {
  const navigate = useNavigate();

  // Delete note handler with optimistic UI update
  const handleDelete = async (e, id) => {
    // Prevent triggering card click when clicking delete button
    e.stopPropagation();
    e.preventDefault();

    // Confirm before deletion
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      // Call API to delete note from backend
      await api.delete(`/notes/${id}`);

      // Update UI immediately (optimistic update) - removes note without reload
      setNotes((prevNotes) => prevNotes.filter((n) => n._id !== id));

      toast.success("Note deleted successfully");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  };

  // Navigate to note detail page when card is clicked
  const handleCardClick = () => {
    navigate(`/note/${note._id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="card bg-base-100 bg-[#e070d5] hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#342e2e] cursor-pointer"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>

        <p className="text-base-content/70 line-clamp-3">{note.content}</p>

        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>

          <div className="flex items-center gap-1">
            {/* Edit button - navigates to detail page where user can edit */}
            <Link
              to={`/note/${note._id}`} // Navigate to detail page (not /edit route which doesn't exist)
              className="btn btn-ghost btn-xs"
              onClick={(e) => e.stopPropagation()} // Prevent triggering card click
            >
              <PenSquare className="size-4" />
            </Link>

            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
