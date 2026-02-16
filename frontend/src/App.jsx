import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // Added for your toasts
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";

const App = () => {
  return (
    /* Apply the theme here. min-h-screen ensures the background covers the whole page */
    <div data-theme="cupcake" className="min-h-screen w-full">
      {/* 1. Removed 'bg-slate-950' because it hides the cupcake theme.
          2. 'fixed' is better than 'relative' for background grids so they don't move.
      */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_34px] [mask-image:radial-gradient(ellipse_60%_90%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Add Toaster here so it works on Create Page */}
      <Toaster position="top-right" />

      {/* 3. Wrap Routes in a relative div with higher z-index 
             so content sits on top of the grid background.
      */}
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/note/:id" element={<NoteDetailPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
