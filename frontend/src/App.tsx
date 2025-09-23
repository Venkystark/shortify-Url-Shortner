import { useState } from "react";
import { AuthProvider } from "./components/AuthContext";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { Dashboard } from "./components/Dashboard";
import { Analytics } from "./components/Analytics";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "login":
        return <LoginPage onNavigate={handleNavigate} />;
      case "signup":
        return <SignupPage onNavigate={handleNavigate} />;
      case "dashboard":
        return (
          <ProtectedRoute onNavigate={handleNavigate}>
            <Dashboard />
          </ProtectedRoute>
        );
      case "analytics":
        return (
          <ProtectedRoute onNavigate={handleNavigate}>
            <Analytics />
          </ProtectedRoute>
        );
      default:
        return <HomePage />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        {currentPage !== "login" && currentPage !== "signup" && (
          <Header currentPage={currentPage} onNavigate={handleNavigate} />
        )}
        <main>
          {renderCurrentPage()}
        </main>
        <Toaster position="top-right" />
      </div>
    </AuthProvider>
  );
}