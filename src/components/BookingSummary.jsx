import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
export default function BookingSummary({ currentUser }) {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    if (currentUser.role === "OWNER" || currentUser.role === "ADMIN") {
      fetch(`${API_URL}/bookings/summary`, {
        headers: { "x-user-id": currentUser.id },
      })
        .then((res) => res.json())
        .then((data) => setSummary(data));
    }
  }, [currentUser]);

  if (currentUser.role !== "OWNER" && currentUser.role !== "ADMIN") return null;

  return (
    <div style={{ marginTop: 30 }}>
      <h3>Bookings Summary (Grouped by User)</h3>
      {summary.map((u) => (
        <div
          key={u.userId}
          style={{ border: "1px solid gray", margin: 5, padding: 10 }}
        >
          <b>
            {u.userName} ({u.role})
          </b>{" "}
          - Total: {u.totalBookings}
          <ul>
            {u.bookings.map((b) => (
              <li key={b.id}>
                {new Date(b.startTime).toLocaleString()} -{" "}
                {new Date(b.endTime).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
