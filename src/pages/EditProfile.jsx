import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Use useNavigate here
import { Gavel, Camera, Eye, EyeOff } from "lucide-react";
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Input,
  FormGroup,
  Label,
  Avatar,
} from "../components/ui/index";
import Header from "../components/header";
import Footer from "../components/footer";
import { Context } from "../App";

export default function EditProfile() {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    imageUrl: null,
    address: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isSignedIn, setIsSignedIn, user } = useContext(Context);
  const [image, setImage] = useState(null);
  // Update user profile function
  const updateUser = async (updatedUser) => {
    try {
      const formData = new FormData();
      formData.append("username", updatedUser.username);
      formData.append("email", updatedUser.email);
      formData.append("phoneNumber", updatedUser.phoneNumber);
      formData.append("address", updatedUser.address);
      formData.append("password", newPassword);
      formData.append("image", image);
      const res = await fetch(`/api/user/update/${updatedUser.id}`, {
        method: "PUT",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to update user data.");
      return await res.json();
    } catch (error) {
      console.error(error);
    }
  };

  // Load user data
  useEffect(() => {
    document.title = "S&D - Profile";
    if (user) {
      setNewUser(user);
      setLoading(false);
    }
  }, [user]);

  // Handle input changes for personal information
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  // Handle password input changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    if (name === "newPassword") setNewPassword(value);
    else if (name === "confirmPassword") setConfirmPassword(value);
  };

  // Handle avatar file upload
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewUser((prevUser) => ({ ...prevUser, imageUrl: reader.result }));
        setImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      return;
    }
    const updatedUser = await updateUser(newUser);
    if (updatedUser) {
      window.location.href = "/profile";
    }
  };

  // Conditional loading view
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
        Loading...
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-blue-400">Edit Profile</h1>
        <form onSubmit={handleSubmit} method="post">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Avatar Section */}
            <Card className="md:col-span-1 bg-gray-800 border border-gray-700">
              <CardHeader>
                <h2 className="text-xl font-semibold text-blue-400">
                  Profile Picture
                </h2>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="relative">
                  <Avatar
                    src={newUser.imageUrl || `/default-avatar.png`}
                    alt="Profile Avatar"
                    size="large"
                    className="w-32 h-32"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-colors"
                  >
                    <Camera size={20} />
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </label>
                </div>
                <p className="mt-4 text-sm text-gray-400">
                  Click the camera icon to upload a new profile picture
                </p>
              </CardContent>
            </Card>

            {/* Personal Information Section */}
            <Card className="md:col-span-2 bg-gray-800 border border-gray-700">
              <CardHeader>
                <h2 className="text-xl font-semibold text-blue-400">
                  Personal Information
                </h2>
              </CardHeader>
              <CardContent>
                <FormGroup>
                  <Label htmlFor="username" className="text-gray-300">
                    Username
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    value={newUser.username || ""}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="email" className="text-gray-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={newUser.email || ""}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="phonenumber" className="text-gray-300">
                    Phone Number
                  </Label>
                  <Input
                    id="phonenumber"
                    name="phoneNumber"
                    value={newUser.phoneNumber || ""}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  />
                </FormGroup>
              </CardContent>
            </Card>

            {/* Password Change Section */}
            <Card className="md:col-span-3 bg-gray-800 border border-gray-700">
              <CardHeader>
                <h2 className="text-xl font-semibold text-blue-400">
                  Change Password
                </h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormGroup>
                    <Label htmlFor="newPassword" className="text-gray-300">
                      New Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={handlePasswordChange}
                        className="bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="confirmPassword" className="text-gray-300">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={handlePasswordChange}
                      className="bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </FormGroup>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              type="submit"
              className="mr-4 bg-blue-500 hover:bg-blue-600 text-white"
            >
              Save Changes
            </Button>
            <Button
              type="button"
              variant="outline"
              as={Link}
              to="/profile"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
