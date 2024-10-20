import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Settings,
  Package,
  LogOut,
  Edit,
  Camera,
  Bell,
  ChevronRight,
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
  Tooltip,
  Alert,
  AlertTitle,
  AlertDescription,
} from "./ui";
import Header from "./header";
import Footer from "./footer";
import { jwtDecode } from "jwt-decode";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "AuctionMaster - Profile";
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const decoded = jwtDecode(token);
        const response = await fetch(
          `http://localhost:8089/api/user/get/${decoded.sub}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch user data");
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(
          "An error occurred while fetching your profile. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
        No user data available
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Info Card */}
          <Card className="lg:col-span-2">
            <CardHeader className="relative">
              <div className="absolute top-0 right-0 mt-4 mr-4">
                <Link to="edit">
                  <Tooltip content="Edit Profile">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white"
                    >
                      <Edit size={20} />
                    </Button>
                  </Tooltip>
                </Link>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar
                    src={`http://localhost:8089/api/user/upload/avatar/${user.imageUrl}`}
                    alt={user.firstname}
                    className="w-32 h-32"
                  />
                </div>
                <h1 className="text-3xl font-bold">{`${user.firstname} ${user.lastname}`}</h1>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormGroup>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={user.email}
                    readOnly
                    className="bg-gray-800"
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={user.phoneNumber}
                    readOnly
                    className="bg-gray-800"
                  />
                </FormGroup>
                <FormGroup className="md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={user.address}
                    readOnly
                    className="bg-gray-800"
                  />
                </FormGroup>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="text-sm text-gray-400">
                Member since:{" "}
                {new Date(user.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <div className="space-x-2">
                <Badge variant="success">Bids Won: {user.bidsWon}</Badge>
                <Badge variant="primary">Total Spent: ${user.totalSpent}</Badge>
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
                    to="/profile/edit"
                    className="flex items-center justify-between p-2 hover:bg-gray-800 rounded"
                  >
                    <div className="flex items-center space-x-2">
                      <User size={20} />
                      <span>Edit Profile</span>
                    </div>
                    <ChevronRight size={16} />
                  </Link>
                  <Link
                    to="/myauctions"
                    className="flex items-center justify-between p-2 hover:bg-gray-800 rounded"
                  >
                    <div className="flex items-center space-x-2">
                      <Package size={20} />
                      <span>My Auctions</span>
                    </div>
                    <ChevronRight size={16} />
                  </Link>
                  <button
                    className="flex items-center justify-between p-2 hover:bg-gray-800 rounded w-full text-left"
                    onClick={handleLogout}
                  >
                    <div className="flex items-center space-x-2">
                      <LogOut size={20} />
                      <span>Logout</span>
                    </div>
                    <ChevronRight size={16} />
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
                      className="flex justify-between items-center p-2 hover:bg-gray-800 rounded"
                    >
                      <div>
                        <p className="font-medium">{activity.item}</p>
                        <p className="text-sm text-gray-400">{activity.date}</p>
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
                <Link
                  to="/activity"
                  className="text-blue-400 hover:text-blue-300 flex items-center"
                >
                  View All Activity
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
