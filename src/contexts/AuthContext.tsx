
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";

// Define the User type
export type UserRole = 'admin' | 'sales' | 'purchases';

export interface User {
  email: string;
  role: UserRole;
  name?: string;
  avatar?: string;
}

// Define the context type
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  
  // Check if user is already logged in from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Mock login function - in a real app, this would call an API
  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // Simple validation
    if (!email || !password) {
      toast({
        title: "Login failed",
        description: "Email and password are required",
        variant: "destructive"
      });
      return false;
    }
    
    // In a real app, you would validate credentials against an API
    // For now, we'll just simulate a successful login
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create user object based on role
      const newUser: User = {
        email,
        role,
        name: role === 'admin' ? 'Admin User' : role === 'sales' ? 'Sales User' : 'Purchases User',
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${email}`
      };
      
      // Save to state and localStorage
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${newUser.name}!`,
      });
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: "An error occurred during login",
        variant: "destructive"
      });
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
