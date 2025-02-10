import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/api";

export default function UserList({ setEditingUser }) {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const res = await getUsers();
        setUsers(res.data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        await deleteUser(id);
        fetchUsers();  // Refresh the list after deleting a user
    };

    return (
        <div className="max-w-4xl mx-auto mt-6">
            <h2 className="text-2xl font-bold mb-4 text-center">User List</h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 shadow-md">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Phone</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-b">
                                <td className="p-3">{user.name}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3">{user.phone}</td>
                                <td className="p-3 text-center flex justify-center gap-2">
                                    <button
                                        onClick={() => setEditingUser(user)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
