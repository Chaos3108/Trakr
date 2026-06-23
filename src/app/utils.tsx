// Use Vite environment variable `VITE_BACKEND_URL` in the browser build.

import  dotenv from 'dotenv';
dotenv.config();

export const URL = process.env.BACKEND_URL || "http://localhost:8000";