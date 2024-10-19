import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Label, Textarea } from "./ui/index";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/index";
import { Gavel } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Signup() {
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: null,
  });

  // Error states
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null); // State for image preview

  const errorAlert = useRef(null);
  useEffect(() => {
    document.title = "S&D - SignUp"; // Change the page title
  }, []);
  const closeAlert = () => {
    errorAlert.current.style.display = "none";
  };
  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.name) newErrors.name = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone number is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";

    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });

    // Create a preview URL for the selected image
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const SignupUser = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // Build the FormData object
    const form = new FormData();
    form.append("username", formData.username); // Should be formData.get('username')
    form.append("email", formData.email); // Should be formData.get('email')
    form.append("password", formData.password); // Should be formData.get('password')
    form.append("firstname", formData.name);
    form.append("lastname", formData.lastName);
    form.append("phoneNumber", formData.phoneNumber);
    form.append("address", formData.address);

    // Append the image file
    if (formData.image) {
      form.append("image", formData.image);
    }

    try {
      const response = await fetch("http://localhost:8089/api/user/signup", {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        const data = await response.json();
        errorAlert.current.style.display = "block";
        setError(data.message);
        return;
      }
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-[#111827]`}
    >
      <Card className={`w-full h-full max-w-md`}>
        <form onSubmit={SignupUser}>
          <CardHeader className="space-y-1">
            <Link to="/">
              <div className="flex items-center justify-center mb-4">
                <Gavel className="h-6 w-6 mr-2" />
                <CardTitle className="text-2xl font-bold">S&D</CardTitle>
              </div>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className=" bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
              style={{ display: "none" }}
              ref={errorAlert}
            >
              <strong className="font-bold">SignUp Error : </strong>
              <span className="block sm:inline">{error}</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                  className="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path
                    onClick={closeAlert}
                    d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
                  />
                </svg>
              </span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="@username"
                type="text"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && (
                <p className="text-red-500">{errors.username}</p>
              )}
            </div>
            <div className="space-y-2 flex flex-row flex-wrap justify-between items-center gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Foulen"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Ben Foulen"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <p className="text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                placeholder="123456"
                type="text"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && (
                <p className="text-red-500">{errors.phoneNumber}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                className=" resize-none"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && (
                <p className="text-red-500">{errors.address}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div className="flex flex-row flex-wrap justify-between items-start gap-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="******************"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password}</p>
                )}
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="******************"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <div className="flex flex-row flex-wrap justify-between items-start gap-4 ">
                {/* File Input */}
                <div className="w-[45%] space-y-2">
                  {" "}
                  {/* Set fixed width */}
                  <Label htmlFor="image">Profile Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="w-full"
                    onChange={handleImageChange}
                  />
                </div>

                {/* Image Preview */}
                <div className="w-[40%] space-y-2">
                  {" "}
                  {/* Set fixed width */}
                  {imagePreview && (
                    <div className="mt-2">
                      <img
                        src={imagePreview}
                        alt="Profile Preview"
                        className="h-24 w-24 object-cover rounded-full"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Button className="w-full" type="submit">
              Sign Up
            </Button>
          </CardContent>
        </form>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className={`text-sm flex flex-wrap`}>
            <span className="mr-1 hidden sm:inline-block">
              You have an account?
            </span>
            <Link to="/login">
              <div
                className={`underline underline-offset-4 hover:text-primary cursor-pointer `}
              >
                Sign In
              </div>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
