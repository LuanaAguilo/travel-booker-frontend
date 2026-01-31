import axios from "axios";

const API_URL = "http://localhost:4000";

export async function getExperiences() {
  const res = await axios.get(`${API_URL}/experiences`);
  return res.data;
}
