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

const api = axios.create({
  baseURL: "http://localhost:5001/api", // ✅ Fixed: Backend runs on port 5000, not 5001
});

export default api;
