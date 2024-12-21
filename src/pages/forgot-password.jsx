import { Link } from "react-router-dom";
import { Button, Input, Label, FormGroup } from "../components/ui/index";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui";
import { Gavel } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../App";

function ForgotPassword() {
  const { isSignedIn } = useContext(Context);
  const email = useRef(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "S&D - Password Change";
    if (isSignedIn) {
      window.location.href = "/";
    }
  }, [isSignedIn]);

  const sendEmail = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    setLoading(true);
    setErrorMessage("");

    const input = email.current.value; // Correctly use ref to access input value
    try {
      const response = await fetch("/api/user/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: input,
        }),
      });

      if (!response.ok) {
        throw new Error(response.message);
      }
      setErrorMessage("Email sent successfully! Check your inbox.");
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111827]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <Link to="/">
            <div className="flex items-center justify-center mb-4">
              <Gavel className="h-6 w-6 mr-2" />
              <CardTitle className="text-2xl font-bold">S&D</CardTitle>
            </div>
          </Link>
          <CardDescription>Request Password Changing</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={sendEmail}>
            <FormGroup>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  required
                  type="email"
                  placeholder="example@example.com"
                  ref={email} // Use ref correctly
                />
              </div>
              {errorMessage && (
                <p className="text-green-500 text-sm">{errorMessage}</p>
              )}
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? "Sending ..." : "Send Email"}
              </Button>
            </FormGroup>
          </form>
        </CardContent>

        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm flex flex-wrap">
            <span className="mr-1 hidden sm:inline-block">
              You do not have an account?
            </span>
            <Link to="/signup">
              <div className="underline underline-offset-4 hover:text-primary cursor-pointer">
                Sign Up
              </div>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ForgotPassword;
