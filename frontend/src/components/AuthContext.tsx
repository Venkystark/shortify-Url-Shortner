import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner@2.0.3";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock API functions - Replace these with your actual backend calls
const mockApi = {
  login: async (email: string, password: string): Promise<{ success: boolean; user?: User; message?: string }> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation - replace with your backend logic
    if (email === "demo@shortify.com" && password === "password") {
      return {
        success: true,
        user: { id: "1", email, name: "Demo User" }
      };
    }
    
    return {
      success: false,
      message: "Invalid email or password"
    };
  },

  signup: async (email: string, password: string, name: string): Promise<{ success: boolean; user?: User; message?: string }> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation - replace with your backend logic
    if (email && password && name) {
      return {
        success: true,
        user: { id: Date.now().toString(), email, name }
      };
    }
    
    return {
      success: false,
      message: "Please fill in all fields"
    };
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check for saved user session on app load
    const savedUser = localStorage.getItem("shortify_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem("shortify_user");
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Replace this with your actual API call
      const response = await mockApi.login(email, password);
      
      if (response.success && response.user) {
        setUser(response.user);
        localStorage.setItem("shortify_user", JSON.stringify(response.user));
        toast.success("Login successful!");
        return true;
      } else {
        toast.error(response.message || "Login failed");
        return false;
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Replace this with your actual API call
      const response = await mockApi.signup(email, password, name);
      
      if (response.success && response.user) {
        setUser(response.user);
        localStorage.setItem("shortify_user", JSON.stringify(response.user));
        toast.success("Account created successfully!");
        return true;
      } else {
        toast.error(response.message || "Signup failed");
        return false;
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("shortify_user");
    localStorage.removeItem("shortifiedUrls"); // Clear user-specific data
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}