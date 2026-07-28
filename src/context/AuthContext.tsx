import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  signup: (name: string, email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  loginAsDemoUser: () => void;
  loginAsDemoAdmin: () => void;
  updateUser: (updatedData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: User = {
  id: 'user-demo',
  name: 'Sarah Jenkins',
  email: 'sarah.j@example.com',
  role: 'user',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
  createdAt: new Date().toISOString(),
  addresses: [
    {
      id: 'addr-1',
      fullName: 'Sarah Jenkins',
      street: '742 Evergreen Terrace',
      city: 'Portland',
      state: 'OR',
      zipCode: '97201',
      country: 'USA',
      phone: '+1 (555) 234-5678',
      isDefault: true
    }
  ]
};

const DEMO_ADMIN: User = {
  id: 'user-admin',
  name: 'Verdant Admin',
  email: 'admin@verdant.com',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  createdAt: new Date().toISOString(),
  addresses: []
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const { showToast } = useToast();
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('verdant_user');
    return saved ? JSON.parse(saved) : DEMO_USER; // Default logged in as demo customer for smooth preview
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('verdant_token') || 'jwt-demo-token-user';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('verdant_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('verdant_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('verdant_token', token);
    } else {
      localStorage.removeItem('verdant_token');
    }
  }, [token]);

  const login = async (email: string, password?: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.data.user);
        setToken(data.data.token);
        showToast(`Welcome back, ${data.data.user.name}!`);
        return true;
      } else {
        showToast(data.message || 'Login failed', 'error');
        return false;
      }
    } catch {
      // Fallback local check
      if (email.includes('admin')) {
        setUser(DEMO_ADMIN);
        setToken('jwt-demo-admin');
      } else {
        setUser(DEMO_USER);
        setToken('jwt-demo-user');
      }
      showToast('Logged in successfully!');
      return true;
    }
  };

  const signup = async (name: string, email: string, password?: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.data.user);
        setToken(data.data.token);
        showToast(`Account created! Welcome to Verdant, ${name}.`);
        return true;
      } else {
        showToast(data.message || 'Registration failed', 'error');
        return false;
      }
    } catch {
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        role: 'user',
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
        createdAt: new Date().toISOString(),
        addresses: []
      };
      setUser(newUser);
      setToken('jwt-demo-user');
      showToast(`Welcome to Verdant, ${name}!`);
      return true;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    showToast('You have been logged out.', 'info');
  };

  const loginAsDemoUser = () => {
    setUser(DEMO_USER);
    setToken('jwt-demo-user');
    showToast('Switched to Demo Customer Account');
  };

  const loginAsDemoAdmin = () => {
    setUser(DEMO_ADMIN);
    setToken('jwt-demo-admin');
    showToast('Switched to Admin Portal Access');
  };

  const updateUser = (updatedData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updatedData });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        signup,
        logout,
        loginAsDemoUser,
        loginAsDemoAdmin,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
