import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Package, LogOut, Edit, ChevronRight } from "lucide-react";
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
} from "../components/ui";
import Header from "../components/header";
import Footer from "../components/footer";
import { jwtDecode } from "jwt-decode";
import { Context } from "../App";
import useGetUser from "./hooks/useGetUser";

export default function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isSignedIn, setIsSignedIn, user, setUser } = useContext(Context);

  useEffect(() => {
    document.title = "S&D - Profile";
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsSignedIn(false);
    navigate("/login");
  };

  const recentActivity = [];

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
                    src={`/api/user/upload/avatar/${user.imageUrl}`}
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
              {/* <CardFooter>
                <Link
                  to="/myauctions"
                  className="text-blue-400 hover:text-blue-300 flex items-center"
                >
                  View All Activity
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </CardFooter> */}
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
