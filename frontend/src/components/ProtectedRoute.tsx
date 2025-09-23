import { ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { Shield, LogIn } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface ProtectedRouteProps {
  children: ReactNode;
  onNavigate: (page: string) => void;
}

export function ProtectedRoute({ children, onNavigate }: ProtectedRouteProps) {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8 text-muted-foreground" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl">Authentication Required</h2>
              <p className="text-muted-foreground">
                Please sign in to access this page and manage your shortened URLs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => onNavigate('login')} className="gap-2">
                <LogIn className="w-4 h-4" />
                Sign In
              </Button>
              <Button variant="outline" onClick={() => onNavigate('signup')}>
                Create Account
              </Button>
            </div>

            <button
              onClick={() => onNavigate('home')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to Home
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}