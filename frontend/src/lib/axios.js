/**
 * Centralized Axios Instance
 *
 * Purpose: Provides a configured axios instance with
 * the correct backend URL for all API requests.
 *
 * Usage: import api from "../lib/axios" and use
 * api.get(), api.post(), api.put(), api.delete()
 */

import axios from "axios";

const BASE_URL = process.env.MODE === "development" ? "http://localhost:5001/api": "/api";

const api = axios.create({
  baseURL:BASE_URL, // ✅ Fixed: Backend runs on port 5001, not 5000
});

export default api;
