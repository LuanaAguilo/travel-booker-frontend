import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function getExperiences() {
  const res = await axios.get(`${API_URL}/experiences`);
  return res.data;
}
