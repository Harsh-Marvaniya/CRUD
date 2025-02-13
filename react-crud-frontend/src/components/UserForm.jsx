import { useState, useEffect } from "react";
import { addUser, updateUser } from "../services/api";

export default function UserForm({ editingUser, setEditingUser, fetchUsers }) {
    const [user, setUser] = useState({ name: "", email: "", phone: "" });

    useEffect(() => {
        if (editingUser) setUser(editingUser);
    }, [editingUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingUser) {
            await updateUser(editingUser.id, user);
        } else {
            await addUser(user);
        }
        setUser({ name: "", email: "", phone: "" });
        setEditingUser(null);
        fetchUsers();  
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">{editingUser ? "Edit User" : "Add User"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={user.phone}
                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <div className="flex gap-2">
                    <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                        {editingUser ? "Update" : "Add"} User
                    </button>
                    {editingUser && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditingUser(null);
                                setUser({ name: "", email: "", phone: "" });
                            }}
                            className="bg-black-500 text-white px-4 py-2 rounded-md hover:bg-black-600"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
