import { Link, useNavigate, useParams } from "react-router-dom";
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

export default function ResetPassword() {
  const { isSignedIn } = useContext(Context);
  const newPassword = useRef(null);
  const confirmNewPassword = useRef(null);
  const { code } = useParams();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const verifyCode = async () => {
      const res = await fetch(`/api/codes/verification/${code}`, {
        method: "GET",
      });
      if (!res.ok) {
        navigate("/forgot-password");
      }
    };

    document.title = "S&D - Password Change";
    if (isSignedIn) {
      navigate("/");
    } else {
      verifyCode();
    }
  }, [isSignedIn, code, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const newPasswordValue = newPassword.current.value;
    const confirmNewPasswordValue = confirmNewPassword.current.value;

    if (newPasswordValue !== confirmNewPasswordValue) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/user/reset-password`, {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
          newPassword: newPasswordValue,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to reset password.");
      }

      alert("Password reset successful. Please log in with your new password.");
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.message);
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
          <CardDescription>Reset Password</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} method="post">
            <FormGroup>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  required
                  type="password"
                  placeholder="Enter new password"
                  ref={newPassword}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-new-password">Confirm Password</Label>
                <Input
                  id="confirm-new-password"
                  required
                  type="password"
                  placeholder="Confirm new password"
                  ref={confirmNewPassword}
                />
              </div>
              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
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
