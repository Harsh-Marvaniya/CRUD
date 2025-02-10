import { useState, useEffect } from "react";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import { getUsers } from "./services/api";

function App() {
    const [editingUser, setEditingUser] = useState(null);
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const res = await getUsers();
        setUsers(res.data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mt-6">CRUD App</h1>
            <UserForm editingUser={editingUser} setEditingUser={setEditingUser} fetchUsers={fetchUsers} />
            <UserList setEditingUser={setEditingUser} fetchUsers={fetchUsers} />
        </div>
    );
}

export default App;
