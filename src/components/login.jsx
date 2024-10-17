import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Label, FormGroup } from "./ui/index";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/index";
import { Gavel, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";

export default function Login() {
  const password = useRef(null);
  const email = useRef(null);
  const navigate = useNavigate();

  const [userForm, setUserForm] = useState({});

  useEffect(() => {
    document.title = "S&D - Login";
  }, []);

  const loginGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });

  const verify = () => {
    const emailValue = email.current.value;
    const passwordValue = password.current.value;

    if (emailValue === "" || passwordValue === "") {
      console.log("Please fill in all fields");
      return false; // Invalid form
    }

    // Determine if it's an email or username and set userForm
    if (emailValue.indexOf("@") === -1) {
      setUserForm({
        username: emailValue,
        password: passwordValue,
      });
    } else {
      setUserForm({
        email: emailValue,
        password: passwordValue,
      });
    }

    return true; // Valid form
  };

  const loginUser = async (e) => {
    e.preventDefault();
    if (!verify()) return; // Only proceed if verification is successful

    try {
      const response = await fetch("http://localhost:8089/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userForm),
      });

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const data = await response.json();
      if (data.jwt) {
        console.log("Login successful");
        localStorage.setItem("token", data.jwt);
        navigate("/"); // Redirect after successful login
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-[#111827]`}
    >
      <Card className={`w-full max-w-md`}>
        <CardHeader className="space-y-1">
          <Link to="/">
            <div className="flex items-center justify-center mb-4">
              <Gavel className="h-6 w-6 mr-2" />
              <CardTitle className="text-2xl font-bold">S&D</CardTitle>
            </div>
          </Link>
          <CardDescription>Login</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormGroup>
            <div className="space-y-2">
              <Label htmlFor="email">Email or Username</Label>
              <Input
                id="email"
                placeholder="m@example.com or username"
                required
                type="text"
                ref={email}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                required
                type="password"
                placeholder="******************"
                ref={password}
              />
            </div>
            <Button className="w-full" type="submit" onClick={loginUser}>
              Sign In
            </Button>
          </FormGroup>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className={`bg-background px-2`}>Or continue with</span>
            </div>
          </div>
          <div className="grid gap-4">
            <Button variant="outline" onClick={() => loginGoogle()}>
              <Mail className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className={`text-sm flex flex-wrap`}>
            <span className="mr-1 hidden sm:inline-block">
              You do not have an account?
            </span>
            <Link to="/signup">
              <div
                className={`underline underline-offset-4 hover:text-primary cursor-pointer`}
              >
                Sign Up
              </div>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
