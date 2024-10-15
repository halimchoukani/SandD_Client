import React, { useState } from "react";
import {
  Search,
  Filter,
  Edit,
  Trash2,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  Button,
  Input,
  Select,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  Avatar,
  Badge,
  Tooltip,
} from "./ui";

const UsersList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filterRole, setFilterRole] = useState("all");

  // Mock user data
  const users = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2023-06-15 10:30 AM",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      role: "Moderator",
      status: "Active",
      lastLogin: "2023-06-14 2:45 PM",
    },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie@example.com",
      role: "User",
      status: "Inactive",
      lastLogin: "2023-06-10 9:15 AM",
    },
    {
      id: 4,
      name: "Diana Ross",
      email: "diana@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2023-06-15 11:20 AM",
    },
    {
      id: 5,
      name: "Ethan Hunt",
      email: "ethan@example.com",
      role: "User",
      status: "Active",
      lastLogin: "2023-06-13 4:30 PM",
    },
  ];

  const filteredUsers = users
    .filter(
      (user) =>
        (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterRole === "all" || user.role === filterRole)
    )
    .sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const SortIcon = ({ column }) => {
    if (column !== sortColumn) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-400">
            User Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/3">
              <Input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
            </div>
            <div className="w-full md:w-1/3 flex items-center space-x-2">
              <Filter className="text-gray-400" />
              <Select
                value={filterRole}
                onValueChange={setFilterRole}
                className="bg-gray-800 border-gray-700 text-white"
                options={[
                  { value: "all", label: "All Roles" },
                  { value: "Admin", label: "Admin" },
                  { value: "User", label: "User" },
                ]}
              ></Select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="px-6 py-3 text-left">
                    <button
                      className="flex items-center"
                      onClick={() => handleSort("name")}
                    >
                      Name <SortIcon column="name" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button
                      className="flex items-center"
                      onClick={() => handleSort("email")}
                    >
                      Email <SortIcon column="email" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button
                      className="flex items-center"
                      onClick={() => handleSort("role")}
                    >
                      Role <SortIcon column="role" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button
                      className="flex items-center"
                      onClick={() => handleSort("status")}
                    >
                      Status <SortIcon column="status" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button
                      className="flex items-center"
                      onClick={() => handleSort("lastLogin")}
                    >
                      Last Login <SortIcon column="lastLogin" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-800">
                    <td className="px-6 py-4 flex items-center space-x-3">
                      <Avatar
                        src={`https://i.pravatar.cc/40?u=${user.id}`}
                        alt={user.name}
                      />
                      <span>{user.name}</span>
                    </td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          user.role === "Admin"
                            ? "destructive"
                            : user.role === "Moderator"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          user.status === "Active" ? "default" : "secondary"
                        }
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">{user.lastLogin}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Tooltip content="Edit User">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Tooltip>
                        <Tooltip content="Delete User">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </Tooltip>
                        <Tooltip content="More Options">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-gray-300"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-400">
            Showing {filteredUsers.length} of {users.length} users
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UsersList;
