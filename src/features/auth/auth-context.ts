import { createContext } from "react";
import type { AuthError, Session, User } from "@supabase/supabase-js";

type AuthResult = {
  error: AuthError | Error | null;
};

export type AuthContextValue = {
  isConfigured: boolean;
  isLoading: boolean;
  session: Session | null;
  user: User | null;
  signInWithPassword: (email: string, password: string) => Promise<AuthResult>;
  signUpWithPassword: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<AuthResult>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
