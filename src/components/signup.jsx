import React, { useState } from "react";
import { Button, Input, Label } from "./ui/index";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/index";
import { Gavel, Facebook, Mail, SunMoon } from "lucide-react";

export default function Signup() {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode
  const handleDarkModeToggle = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        darkMode ? "bg-gray-900 text-white" : "bg-white"
      }`}
    >
      <Card className={`w-full max-w-md ${darkMode ? "bg-gray-800" : ""}`}>
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Gavel className="h-6 w-6 mr-2" />
            <CardTitle className="text-2xl font-bold ">AuctionMaster</CardTitle>
          </div>
          <CardDescription>Sign up</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-row justify-between items-center gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Foulen" required type="text" />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Ben Foulen"
                required
                type="text"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="m@example.com"
              required
              type="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" required type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cpassword">Confirm Password</Label>
            <Input id="cpassword" required type="password" />
          </div>
          <Button className="w-full" type="submit">
            Sign Up
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span
                className={`bg-background px-2 ${
                  darkMode ? "text-gray-400" : "text-muted-foreground"
                }`}
              >
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline">
              <Facebook className="mr-2 h-4 w-4" />
              Facebook
            </Button>
            <Button variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div
            className={`text-sm flex flex-wrap ${
              darkMode ? "text-gray-400" : "text-muted-foreground"
            }`}
          >
            <span className="mr-1 hidden sm:inline-block">
              You have an account?
            </span>
            <div
              className={`underline underline-offset-4 hover:text-primary ${
                darkMode ? "hover:text-gray-200" : ""
              }`}
              href="#"
            >
              Login
            </div>
          </div>
        </CardFooter>
      </Card>
      <div
        className="absolute bottom-0 left-0 p-4 cursor-pointer"
        onClick={handleDarkModeToggle}
      >
        <SunMoon />
      </div>
    </div>
  );
}
