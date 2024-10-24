import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import { jwtDecode } from "jwt-decode"; // Correct import
import Header from "../components/header";
import Footer from "../components/footer";

export default function EditProfile() {
  const getUser = async (id) => {
    const res = await fetch(`/api/user/get/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  };

  const updateUser = async (user) => {
    const res = await fetch(`/api/user/update/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: user.firstname,
        lastname: user.lastname,
        phoneNumber: user.phoneNumber,
      }),
    });
    return res.json();
  };

  const [user, setUser] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.title = "S&D - Profile";
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      getUser(decoded.sub).then((data) => setUser(data));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prevUser) => ({ ...prevUser, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(user);
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-blue-400">Edit Profile</h1>
        <form onSubmit={handleSubmit}>
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
                    src={`/api/user/upload/avatar/${user.imageUrl}`}
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
                  <Label htmlFor="firstname" className="text-gray-300">
                    First Name
                  </Label>
                  <Input
                    id="firstname"
                    name="firstname"
                    value={user.firstname || ""}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="lastname" className="text-gray-300">
                    Last Name
                  </Label>
                  <Input
                    id="lastname"
                    name="lastname"
                    value={user.lastname || ""}
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
                    value={user.phoneNumber || ""}
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
