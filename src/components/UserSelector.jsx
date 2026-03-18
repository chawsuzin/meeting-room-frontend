export default function UserSelector({ users, currentUser, setCurrentUser }) {
  return (
    <select
      value={currentUser?.id}
      onChange={(e) =>
        setCurrentUser(users.find((u) => u.id == e.target.value))
      }
      className="w-52 h-8 border rounded border-gray-600 bg-gray-200 mr-2 mb-6"
    >
      {users.map((u) => (
        <option key={u.id} value={u.id}>
          {u.name} ({u.role})
        </option>
      ))}
    </select>
  );
}
