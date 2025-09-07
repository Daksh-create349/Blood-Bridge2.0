"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import useLocalStorage from '@/hooks/use-local-storage';

interface AuthContextType {
  isAuthenticated: boolean;
  hospital: string | null;
  login: (hospital: string | null, redirect?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage('isAuthenticated', false);
  const [hospital, setHospital] = useLocalStorage<string | null>('loggedInHospital', null);
  const router = useRouter();

  const login = (hospital: string | null, redirect = '/dashboard') => {
    setIsAuthenticated(true);
    setHospital(hospital);
    router.push(redirect);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setHospital(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, hospital, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
