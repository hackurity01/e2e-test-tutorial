import { createContext, useContext, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import * as authApi from "../api/auth";
import type { User } from "../types";

type AuthContextValue = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (payload: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const STORAGE_KEY = "shop_user";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  });

  const login = async (email: string, password: string) => {
    try {
      const loggedIn = await authApi.login(email, password);
      setUser(loggedIn);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedIn));
      toast.success("로그인 완료!");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "로그인에 실패했어요.";
      toast.error(message);
      throw error;
    }
  };

  const signup = async (payload: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const created = await authApi.signup(payload);
      setUser(created);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(created));
      toast.success("회원가입이 완료됐어요.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "회원가입에 실패했어요.";
      toast.error(message);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    toast("로그아웃했어요.");
  };

  const value = useMemo(
    () => ({
      user,
      login,
      signup,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("AuthProvider가 필요해요.");
  }
  return ctx;
};
