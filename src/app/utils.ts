// Use Vite environment variable `VITE_BACKEND_URL` in the browser build.
// Falls back to localhost if not provided.
export const URL = (import.meta.env.BACKEND_URL as string) || "http://localhost:8000";