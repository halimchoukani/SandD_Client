import { Link } from "react-router-dom";
import { Button, Input, Label } from "./ui/index";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/index";
import { Gavel } from "lucide-react";
import { useEffect } from "react";

export default function Signup() {
  useEffect(() => {
    document.title = "S&D - SignUp"; // Change the page title
  }, []);
  return (
    <div
      className={`min-h-screen flex items-center justify-center $
        bg-[#111827]
      `}
    >
      <Card className={`w-full max-w-md`}>
        <CardHeader className="space-y-1">
          <Link to="/">
            <div className="flex items-center justify-center mb-4">
              <Gavel className="h-6 w-6 mr-2" />
              <CardTitle className="text-2xl font-bold ">S&D</CardTitle>
            </div>
          </Link>
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
            <Input id="password" required type="password" placeholder="******************" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cpassword">Confirm Password</Label>
            <Input id="cpassword" required type="password" placeholder="******************" />
          </div>
          <Button className="w-full" type="submit">
            Sign Up
          </Button>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className={`text-sm flex flex-wrap`}>
            <span className="mr-1 hidden sm:inline-block">
              You have an account?
            </span>
            <Link to="/login">
              <div
                className={`underline underline-offset-4 hover:text-primary cursor-pointer `}
                href="#"
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
