import React, { useState, useEffect } from "react";
import { Search, Edit, Trash2, UserPlus, UnlockIcon, LockIcon } from "lucide-react";
import Header from "../components/header";
import Footer from "../components/footer";
import { User, Truck, Phone, MapPin, Calendar, DollarSign } from "lucide-react";

export default function UserManager() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "S&D - User Manager";
    fetchUsers();
  }, []);

  const changeStatus = async (userId) => {
    try {
      const d = new FormData();
      d.set("id", userId);
      const response = await fetch(`/api/user/status`, {
        method: "PUT",
        body: d,
      });
      if (response.ok) {
        setUsers(prevUsers => prevUsers.map(user => {
          if (user.id === userId) {
            return { ...user, status: user.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE' };
          }
          return user;
        }));
      }
    } catch (error) {
      console.error("Error changing user status:", error);
    }
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/user/get/all/exceptadmins`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Invalid date";
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
  };

  const filteredUsers = users.filter(
    (user) =>
      user.id.toString().includes(searchTerm.toLowerCase()) ||
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastname?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-blue-400">User Manager</h1>
        <div className="bg-gray-800 p-6 rounded-lg shadow mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="relative flex-grow mr-4">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md flex items-center">
              <UserPlus className="mr-2" />
              Add transporter
            </button>
          </div>
          {isLoading ? (
            <p className="text-center text-gray-300">Loading users...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="p-3 text-left">ID</th>
                    <th className="p-3 text-left">User</th>
                    <th className="p-3 text-left">Contact</th>
                    <th className="p-3 text-left">Role</th>
                    <th className="p-3 text-left">Amount</th>
                    <th className="p-3 text-left">Address</th>
                    <th className="p-3 text-left">Created</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-700">
                      <td className="p-3">
                        <div>{user.id}</div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-3">
                          <img
                            src={`/api/user/upload/avatar/${user.imageUrl}`}
                            alt={`${user.firstname} ${user.lastname}`}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <div className="font-bold">{user.username}</div>
                            <div className="text-gray-400 text-sm">{`${user.firstname} ${user.lastname}`}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div>{user.email}</div>
                        <div className="text-gray-400 text-sm">
                          <Phone className="inline w-4 h-4 mr-1" />
                          {`+216 ${user.phoneNumber}`}
                        </div>
                      </td>
                      <td className="p-3">
                        {user.role === "USER" ? (
                          <User className="inline w-5 h-5 text-blue-400" />
                        ) : (
                          <Truck className="inline w-5 h-5 text-green-400" />
                        )}
                        <span className="ml-2">{user.role}</span>
                      </td>
                      <td className="p-3">{`${user.amount} TND`}</td>
                      <td className="p-3">
                        <MapPin className="inline w-4 h-4 mr-1" />
                        {user.address}
                      </td>
                      <td className="p-3">
                        <Calendar className="inline w-4 h-4 mr-1" />
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => changeStatus(user.id)}
                          className={`flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                            user.status === 'ACTIVE'
                              ? 'bg-green-500 hover:bg-green-600 text-white'
                              : 'bg-red-500 hover:bg-red-600 text-white'
                          }`}
                        >
                          {user.status === 'ACTIVE' ? (
                            <UnlockIcon className="w-4 h-4 mr-1" />
                          ) : (
                            <LockIcon className="w-4 h-4 mr-1" />
                          )}
                          {user.status}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

