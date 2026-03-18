// src/services/api.js
export const API_URL = import.meta.env.VITE_API_URL;
/* ---------------- USERS ---------------- */

// Get all users
export const getUsers = async () => {
  const res = await fetch(`${API_URL}/users`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

// Create a new user (Admin only)
export const createUser = async (currentUserId, user) => {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-user-id": currentUserId,
    },
    body: JSON.stringify(user),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Failed to create user");
  return json;
};

// Change user role (Admin only)
export const changeUserRole = async (currentUserId, userId, role) => {
  const res = await fetch(`${API_URL}/users/${userId}/role`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-user-id": currentUserId,
    },
    body: JSON.stringify({ role }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Failed to change role");
  return json;
};

// Delete a user (Admin only)
export const deleteUser = async (currentUserId, userId) => {
  const res = await fetch(`${API_URL}/users/${userId}`, {
    method: "DELETE",
    headers: {
      "x-user-id": currentUserId,
    },
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Failed to delete user");
  return json;
};

/* ---------------- BOOKINGS ---------------- */

// Get all bookings
export const getBookings = async () => {
  const res = await fetch(`${API_URL}/bookings`);
  if (!res.ok) throw new Error("Failed to fetch bookings");
  return res.json();
};

// Create a new booking
export const createBooking = async (currentUserId, data) => {
  const res = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-user-id": currentUserId,
    },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Failed to create booking");
  return json;
};

// Delete a booking
export const deleteBooking = async (currentUserId, bookingId) => {
  const res = await fetch(`${API_URL}/bookings/${bookingId}`, {
    method: "DELETE",
    headers: {
      "x-user-id": currentUserId,
    },
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Failed to delete booking");
  return json;
};
