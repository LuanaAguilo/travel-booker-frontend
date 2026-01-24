const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:4000";

export async function getExperiences() {
  const res = await fetch(`${API_URL}/experiences`);
  if (!res.ok) throw new Error("Failed to fetch experiences");
  return res.json();
}
