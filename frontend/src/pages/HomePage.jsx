/**
 * Home Page / Notes List Page
 *
 * Features:
 * - Display all notes in a responsive grid
 * - Fetch notes from backend on component mount
 * - Handle rate limiting (429 status code)
 * - Show loading state while fetching
 * - Display rate limit UI if rate limited
 * - Pass setNotes to NoteCard for optimistic delete updates
 */

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";
import { toast } from "react-hot-toast";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get("/notes");
        console.log(response.data);
        setNotes(response.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching notes:", error);

        if (error.response?.status === 429) {
          setIsRateLimited(true);
          toast.error("You are being rate limited. Please try again later.");
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">Loading notes...</div>
        )}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
