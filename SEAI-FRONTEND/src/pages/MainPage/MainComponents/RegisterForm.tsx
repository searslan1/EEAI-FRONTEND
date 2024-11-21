import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { Button } from "../../../components/common/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "../../../components/common/card";

type RegisterFormProps = {
  onClose: () => void;
};

export default function RegisterForm({ onClose }: RegisterFormProps) {
  const auth = useAuth();
  const [companyName, setCompanyName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    try {
      if (newPassword !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      await auth.handleRegister(companyName, newEmail, newPassword);
      onClose();
    } catch {
      alert('Login failed. Please try again.');
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Enter your details to create a new account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="company-name">Company Name</Label>
          <Input
            id="company-name"
            type="text"
            placeholder="Your Company"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-email">Email</Label>
          <Input
            id="new-email"
            type="email"
            placeholder="m@example.com"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-password">Password</Label>
          <Input
            id="new-password"
            type="password"
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleRegister}>
          Create Account
        </Button>
      </CardFooter>
    </Card>
  );
}
