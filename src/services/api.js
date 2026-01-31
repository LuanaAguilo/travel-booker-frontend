const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// Experiences
export async function getExperiences() {
  const res = await fetch(`${API_URL}/experiences`);
  if (!res.ok) throw new Error("Failed to fetch experiences");
  return res.json();
}

// Bookings CRUD
export async function getBookings() {
  const res = await fetch(`${API_URL}/bookings`);
  if (!res.ok) throw new Error("Failed to fetch bookings");
  return res.json();
}

export async function createBooking(data) {
  const res = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create booking");
  return res.json();
}

export async function updateBooking(id, data) {
  const res = await fetch(`${API_URL}/bookings/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update booking");
  return res.json();
}

export async function deleteBooking(id) {
  const res = await fetch(`${API_URL}/bookings/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete booking");
  return true;
}
