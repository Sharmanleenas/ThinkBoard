/**
 * Navbar Component
 *
 * Features:
 * - Display ThinkBoard branding
 * - Link to create new note
 * Purpose: Navigation header appearing on all pages
 */

import { PlusIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom"; // ✅ Fixed: Use react-router-dom, not react-router

export const Navbar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="container mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
            ThinkBoard
          </h1>
          <div className="flex items-center gap-4">
            {/* Link to create new note page */}
            <Link to={"create"} className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
