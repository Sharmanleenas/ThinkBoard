/**
 * Note Detail Page
 *
 * Features:
 * - View and edit single note by ID
 * - Update note title and content
 * - Delete note with confirmation
 * - Redirect to home on successful operations
 * - Loading state while fetching note
 */

import React, { useEffect, useState } from "react"; // ✅ Removed unused cloneElement
import toast from "react-hot-toast"; // ✅ Fixed: LoaderIcon doesn't exist in react-hot-toast
import { useParams, useNavigate } from "react-router-dom";
import api from "../lib/axios";
import { ArrowLeft, Loader, Trash } from "lucide-react"; // ✅ Removed unused HandHelping
import { Link } from "react-router-dom";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error fetching note details:", error);
        toast.error("Failed to fetch note details");
        navigate("/"); // Redirect to home on error
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.log("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/notes/${id}`, {
        title: note.title,
        content: note.content,
      });
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error updating note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  // Show loading spinner while fetching note
  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <Loader className="animate-spin text-primary size-12" />{" "}
        {/* ✅ Fixed: Use Loader from lucide-react */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeft className="size-6" />
              Back to Home
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash className="size-4" />
              Delete Note
            </button>
          </div>
          <div className="card bg-base-100 ">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  value={note.title}
                  placeholder="Note title"
                  className="input input-bordered"
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  value={note.content}
                  placeholder="Note content"
                  className="textarea textarea-bordered h-32"
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
