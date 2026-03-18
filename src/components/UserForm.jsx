import { useState } from "react";
import { createUser } from "../services/api";

export default function CreateUserForm({ currentUser }) {
  const [user, setUser] = useState({
    name: "",
    role: "USER",
  });

  if (currentUser.role !== "ADMIN") return null;

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!user.name || user.name.trim() === "") {
      alert("Name is required!");
      return;
    }

    const confirmCreate = window.confirm(
      `Create user "${user.name}" with role ${user.role}?`,
    );

    if (!confirmCreate) return;

    try {
      await createUser(currentUser.id, user);
      setUser({ name: "", role: "USER" });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Create User</h3>

      <form onSubmit={handleCreate}>
        <input
          placeholder="Name"
          value={user.name || ""}
          className="w-32 h-8 border rounded border-gray-600 bg-gray-200 p-2 mr-2"
          onChange={(e) =>
            setUser({
              ...user,
              name: e.target.value,
            })
          }
        />

        <select
          className="w-32 h-8 border rounded border-gray-600 bg-gray-200 mr-2"
          onChange={(e) =>
            setUser({
              ...user,
              role: e.target.value,
            })
          }
        >
          <option value="USER">USER</option>
          <option value="OWNER">OWNER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <button className="w-24 h-8 border border-gray-600 rounded bg-[#00A6F4]">
          Create
        </button>
      </form>
    </div>
  );
}
