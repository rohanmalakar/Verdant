import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { useToast } from './ToastContext';

interface StoredUser extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  signup: (name: string, email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updatedData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEYS = {
  users: 'verdant_users',
  currentUser: 'verdant_user',
  token: 'verdant_token'
} as const;

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') {
    return fallback;
  }

  const raw = window.localStorage.getItem(key);
  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function createUserFromStoredUser(storedUser: StoredUser): User {
  const { password: _password, ...user } = storedUser;
  return user;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { showToast } = useToast();
  const [storedUsers, setStoredUsers] = useState<StoredUser[]>(() => readStorage(STORAGE_KEYS.users, []));
  const [user, setUser] = useState<User | null>(() => readStorage<User | null>(STORAGE_KEYS.currentUser, null));
  const [token, setToken] = useState<string | null>(() => readStorage<string | null>(STORAGE_KEYS.token, null));

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(storedUsers));
  }, [storedUsers]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (user) {
      window.localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(STORAGE_KEYS.currentUser);
    }
  }, [user]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (token) {
      window.localStorage.setItem(STORAGE_KEYS.token, token);
    } else {
      window.localStorage.removeItem(STORAGE_KEYS.token);
    }
  }, [token]);

  const login = async (email: string, password?: string): Promise<boolean> => {
    const normalizedEmail = normalizeEmail(email);
    const matchedUser = storedUsers.find((storedUser) => storedUser.email.toLowerCase() === normalizedEmail);

    if (!matchedUser) {
      showToast('No account found for that email. Create an account first.', 'error');
      return false;
    }

    if (matchedUser.password !== (password || '')) {
      showToast('Incorrect password.', 'error');
      return false;
    }

    const publicUser = createUserFromStoredUser(matchedUser);
    setUser(publicUser);
    setToken(`jwt-local-${publicUser.id}`);
    showToast(`Welcome back, ${publicUser.name}!`);
    return true;
  };

  const signup = async (name: string, email: string, password?: string): Promise<boolean> => {
    const normalizedEmail = normalizeEmail(email);

    if (storedUsers.some((storedUser) => storedUser.email.toLowerCase() === normalizedEmail)) {
      showToast('An account with that email already exists.', 'error');
      return false;
    }

    if (!password) {
      showToast('Please choose a password.', 'error');
      return false;
    }

    const newUser: StoredUser = {
      id: `user-${Date.now()}`,
      name,
      email: normalizedEmail,
      role: 'user',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
      createdAt: new Date().toISOString(),
      addresses: [],
      password
    };

    setStoredUsers((currentUsers) => [newUser, ...currentUsers]);
    setUser(createUserFromStoredUser(newUser));
    setToken(`jwt-local-${newUser.id}`);
    showToast(`Account created! Welcome to Verdant, ${name}.`);
    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    showToast('You have been logged out.', 'info');
  };

  const updateUser = (updatedData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updatedData };
      setUser(updatedUser);
      setStoredUsers((currentUsers) =>
        currentUsers.map((storedUser) =>
          storedUser.id === user.id ? { ...storedUser, ...updatedData } : storedUser
        )
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
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
