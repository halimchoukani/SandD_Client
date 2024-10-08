import { Link } from "react-router-dom"; // Import Link
import { Button, Input, Label } from "./ui/index";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/index";
import { Gavel, Facebook, Mail } from "lucide-react";
import { useEffect } from "react";
export default function Login() {
  useEffect(() => {
    document.title = "S&D - Login"; // Change the page title
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
          <CardDescription>Login</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">

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
         
          <Button className="w-full" type="submit">
            Sign In
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className={`bg-background px-2 `}>Or continue with</span>
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
          <div className={`text-sm flex flex-wrap`}>
            <span className="mr-1 hidden sm:inline-block">
              You do not have an account?
            </span>
            <Link to="/signup">
            <div
              className={`underline underline-offset-4 hover:text-primary cursor-pointer `}
              href="#"
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
