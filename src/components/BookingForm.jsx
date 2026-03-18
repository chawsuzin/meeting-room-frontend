import { useState } from "react";
import { createBooking } from "../services/api"; // optional if using api.js directly

export default function BookingForm({ currentUser, onCreate }) {
  const [form, setForm] = useState({
    start: "",
    end: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.start || !form.end) {
      alert("Start and End time are required.");
      return;
    }

    if (form.start >= form.end) {
      alert("Start time must be before End time.");
      return;
    }

    try {
      await onCreate({
        startTime: form.start,
        endTime: form.end,
      });

      // Clear form after successful creation
      setForm({ start: "", end: "" });
    } catch (err) {
      // Show backend errors (e.g., overlap)
      alert(err.message || "Failed to create booking. Possible overlap.");
    }
  };

  return (
    <div className="p-4 border rounded shadow mb-4">
      <h3 className="text-lg font-semibold mb-2">Create Booking</h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label>
          Start Time:
          <input
            type="datetime-local"
            value={form.start}
            onChange={(e) => setForm({ ...form, start: e.target.value })}
            className="border p-1 rounded w-full"
            required
          />
        </label>

        <label>
          End Time:
          <input
            type="datetime-local"
            value={form.end}
            onChange={(e) => setForm({ ...form, end: e.target.value })}
            className="border p-1 rounded w-full"
            required
          />
        </label>

        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-40"
        >
          Create Booking
        </button>
      </form>
    </div>
  );
}
