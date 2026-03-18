import React, { useEffect, useState, useCallback } from "react";
import { changeUserRole, deleteUser, getUsers } from "../services/api";

export default function UserList({ currentUser }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error("Fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleChangeRole = async (userId, currentRole, newRole) => {
    if (currentRole === newRole) return;
    
    // Safety check: Prevent changing own role accidentally
    if (userId === currentUser.id) {
      alert("You cannot change your own role.");
      return;
    }

    if (!window.confirm(`Change role to ${newRole}?`)) return;

    try {
      const updateUser = await changeUserRole(currentUser.id, userId, newRole);
      setUsers((prev) => prev.map((u) => (u.id === userId ? updateUser : u)));
    } catch (err) {
      alert("Error: " + err.message);
    }
  };
  // Delete User
  const handleDelete = async (userId) => {
    // Safety check: Prevent self-deletion
    if (userId === currentUser.id) {
      alert("You cannot delete your own account from here.");
      return;
    }

    if (!window.confirm("Delete this user?")) return;

    try {
      await deleteUser(currentUser.id, userId);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="p-4 text-center">Loading users...</div>;

  return (
    <div className="">
      <h2 className="text-xl font-bold mb-4">User Management</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="text-center items-center">
                <td className="border p-2">{u.id}</td>
                <td className="border p-2 w-52 items-start text-start">
                  {u.name}
                </td>
                <td className="border p-2 w-52">{u.role}</td>
              <td className="border p-2 space-x-2 items-center text-center">
                {/* Change Role */}
                  <select
                    value={u.role}
                    onChange={(e) => handleChangeRole(u.id, u.role, e.target.value)}
                    className="w-32 h-8 border rounded border-gray-600 bg-gray-200 mr-2"
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="OWNER">OWNER</option>
                    <option value="USER">USER</option>
                  </select>
{/* Delete Button */}
                  
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="w-24 h-8 rounded bg-red-500 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
}