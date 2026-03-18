import { useState, useEffect } from "react";
import {
  getUsers,
  getBookings,
  createBooking,
  deleteBooking,
} from "./services/api";

import UserSelector from "./components/UserSelector";
import CreateUserForm from "./components/UserForm";
import BookingForm from "./components/BookingForm";
import BookingList from "./components/BookingList";
import UserList from "./components/UserList";
import BookingSummary from "./components/BookingSummary";

export default function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await getUsers();
      setUsers(data);
      setCurrentUser(data[0]);
      const bookingsData = await getBookings();
      setBookings(bookingsData);
    };
    load();
  }, []);

  const handleCreateBooking = async (data) => {
    try {
      await createBooking(currentUser.id, data);
      const updatedBookings = await getBookings();
      setBookings(updatedBookings);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteBooking = async (id) => {
    try {
      await deleteBooking(currentUser.id, id);
      const updatedBookings = await getBookings();
      setBookings(updatedBookings);
    } catch (err) {
      alert(err.message);
    }
  };

  if (!currentUser) return "Loading...";

  return (
    <div style={{ padding: 40 }}>
      <h2 className="text-2xl font-bold mb-4 text-center">
        Meeting Room Booking
      </h2>
      <UserSelector
        users={users}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <CreateUserForm currentUser={currentUser} />
      {currentUser.role === "ADMIN" && (
        <UserList users={users} currentUser={currentUser} />
      )}
      <BookingForm currentUser={currentUser} onCreate={handleCreateBooking} />
      <BookingList
        bookings={bookings}
        currentUser={currentUser}
        onDelete={handleDeleteBooking}
      />
      <BookingSummary currentUser={currentUser} />
    </div>
  );
}
