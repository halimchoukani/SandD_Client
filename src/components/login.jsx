import React from "react";
import { Button } from "../components/ui/index";
import { Input } from "../components/ui/index";
import { Label } from "../components/ui/index";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/index";
import { Gavel, Facebook, Mail } from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Gavel className="h-6 w-6 mr-2" />
            <CardTitle className="text-2xl font-bold">AuctionMaster</CardTitle>
          </div>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
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
            <Input id="password" required type="password" />
          </div>
          <div
            className="text-sm underline underline-offset-4 hover:text-primary"
            href="#"
          >
            Forgot password?
          </div>
          <Button className="w-full" type="submit">
            Sign In
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
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
          <div className="text-sm text-muted-foreground flex flex-wrap">
            <span className="mr-1 hidden sm:inline-block">
              Don&apos;t have an account?
            </span>
            <div
              className="underline underline-offset-4 hover:text-primary"
              href="#"
            >
              Sign up
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
