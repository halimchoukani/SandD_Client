import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  Gavel,
  User,
  Settings,
  Package,
  CreditCard,
  LogOut,
} from "lucide-react";
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Input,
  FormGroup,
  Label,
  Avatar,
  Badge,
} from "./ui";
import Header from "./header";
import Footer from "./footer";

export default function Profile() {
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar:
      "https://blenderartists.org/uploads/default/original/4X/7/f/3/7f36fa03901a1714543c7fbdf3403ce4179d5605.jpeg",
    joinDate: "January 2023",
    bidsWon: 15,
    totalSpent: 5000,
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the updated user data to your backend
    setIsEditing(false);
  };

  const recentActivity = [
    {
      id: 1,
      type: "bid",
      item: "Vintage Watch",
      date: "2024-03-10",
      amount: 500,
    },
    {
      id: 2,
      type: "won",
      item: "Antique Vase",
      date: "2024-03-05",
      amount: 750,
    },
    { id: 3, type: "bid", item: "Rare Coin", date: "2024-03-01", amount: 300 },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* User Info Card */}
          <Card className="md:col-span-2">
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Profile Information</h2>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar
                    src={user.avatar}
                    alt={user.name}
                    className="w-[200px] h-[200px]"
                  />
                </div>
                <FormGroup>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </FormGroup>
                {isEditing && (
                  <Button type="submit" className="mt-4">
                    Save Changes
                  </Button>
                )}
              </form>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between items-center w-full">
                <span>Member since: {user.joinDate}</span>
                <div>
                  <Badge variant="success" className="mr-2">
                    Bids Won: {user.bidsWon}
                  </Badge>
                  <Badge variant="primary">
                    Total Spent: ${user.totalSpent}
                  </Badge>
                </div>
              </div>
            </CardFooter>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Account Menu</h3>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2   hover:text-blue-500"
                  >
                    <User size={20} />
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/profile/edit"
                    className="flex items-center space-x-2   hover:text-blue-500"
                  >
                    <Settings size={20} />
                    <span>Settings</span>
                  </Link>
                  <Link
                    to="/my-bids"
                    className="flex items-center space-x-2   hover:text-blue-500"
                  >
                    <Package size={20} />
                    <span>My Bids</span>
                  </Link>
                  <button
                    className="flex items-center space-x-2   hover:text-blue-500 w-full text-left"
                    onClick={Logout}
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </nav>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Recent Activity</h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {recentActivity.map((activity) => (
                    <li
                      key={activity.id}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">{activity.item}</p>
                        <p className="text-sm text-gray-500">{activity.date}</p>
                      </div>
                      <Badge
                        variant={
                          activity.type === "won" ? "success" : "primary"
                        }
                      >
                        {activity.type === "won" ? "Won" : "Bid"}: $
                        {activity.amount}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link to="/activity" className="text-blue-500 hover:underline">
                  View All Activity
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
