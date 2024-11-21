import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/common/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/common/card";
import { Github } from "lucide-react";

type LoginFormProps = {
  onClose: () => void;
};

export default function LoginForm({ onClose }: LoginFormProps) {
  const auth = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Yükleme durumu

  const handleLogin = async () => {
    try {
      setLoading(true); // Yükleme durumunu başlat
      await auth.handleLogin(email, password);
      onClose();
      navigate("/dashboard");
    } catch (error: unknown) {
      console.error("Login error:", error);
      alert(
        (error as Error)?.message || "An unexpected error occurred during login."
      ); // Kullanıcıya detaylı mesaj göster
    } finally {
      setLoading(false); // Yükleme durumunu sıfırla
    }
  };

  const handleGitHubLogin = () => {
    alert("GitHub login is not implemented yet.");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading} // Yüklenirken girişleri devre dışı bırak
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading} // Yüklenirken girişleri devre dışı bırak
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button
          className="w-full mb-2"
          onClick={handleLogin}
          disabled={loading} // Yüklenirken butonu devre dışı bırak
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
        <Button variant="outline" className="w-full" onClick={handleGitHubLogin}>
          <Github className="mr-2 h-4 w-4" />
          Login with GitHub
        </Button>
      </CardFooter>
    </Card>
  );
}
