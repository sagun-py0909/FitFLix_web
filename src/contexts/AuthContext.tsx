import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@/types';
import { AuthService } from '@/lib/auth';
import { toast } from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      // Check if user is stored locally
      const storedUser = AuthService.getStoredUser();
      if (storedUser) {
        setUser(storedUser);
        
        // Verify with server
        try {
          const response = await AuthService.getCurrentUser();
          if (response.success && response.data?.user) {
            setUser(response.data.user);
            localStorage.setItem('user', JSON.stringify(response.data.user));
          }
        } catch (error) {
          // If verification fails, clear stored user
          AuthService.clearAuth();
          setUser(null);
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await AuthService.login({ email, password });
      
      if (response.success && response.data?.user) {
        setUser(response.data.user);
        toast.success('Login successful!');
        return true;
      } else {
        toast.error(response.message || 'Login failed');
        return false;
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any): Promise<boolean> => {
    try {
      setIsLoading(true);
      console.log('AuthContext: Starting registration process...');
      const response = await AuthService.register(userData);
      
      console.log('AuthContext: Registration response:', response);
      
      // Handle both response formats:
      // Backend format: { message: "...", user: {...} }
      // Expected format: { success: true, data: { user: {...} } }
      const responseAny = response as any;
      
      if (responseAny && responseAny.user) {
        // Direct user object from backend
        setUser(responseAny.user);
        toast.success('Registration successful!');
        console.log('AuthContext: Registration successful, user set:', responseAny.user);
        return true;
      } else if (response.success && response.data?.user) {
        // Expected ApiResponse format
        setUser(response.data.user);
        toast.success('Registration successful!');
        console.log('AuthContext: Registration successful, user set:', response.data.user);
        return true;
      } else {
        console.log('AuthContext: Registration failed - no user in response:', response);
        toast.error(responseAny.message || response.message || 'Registration failed');
        return false;
      }
    } catch (error: any) {
      console.log('AuthContext: Registration error caught:', error);
      console.log('AuthContext: Error response:', error.response);
      toast.error(error.response?.data?.message || 'Registration failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await AuthService.logout();
      setUser(null);
      toast.success('Logged out successfully');
    } catch (error) {
      // Even if logout fails on server, clear local state
      AuthService.clearAuth();
      setUser(null);
      toast.success('Logged out successfully');
    }
  };

  const updateUser = (userData: Partial<User>): void => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const refreshUser = async (): Promise<void> => {
    try {
      const response = await AuthService.getCurrentUser();
      if (response.success && response.data?.user) {
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};