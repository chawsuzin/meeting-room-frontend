export default function BookingList({ bookings, currentUser, onDelete }) {
  return (
    <div>
      <h3>Bookings</h3>

      {bookings.map((b) => (
        <div
          key={b.id}
          style={{ border: "1px solid gray", margin: 5, padding: 10 }}
        >
          <div>
            {new Date(b.startTime).toLocaleString()}-
            {new Date(b.endTime).toLocaleString()}
          </div>

          <div>User: {b.user.name}</div>

          {(currentUser.role !== "USER" || b.userId === currentUser.id) && (
            <button
              onClick={() => onDelete(b.id)}
              className="w-24 h-8 rounded bg-red-500 text-white"
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
