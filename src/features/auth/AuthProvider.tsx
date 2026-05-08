import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { AuthContext, type AuthContextValue } from "./auth-context";

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(supabase));

  useEffect(() => {
    if (!supabase) {
      return;
    }

    let isMounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) {
        return;
      }

      setSession(data.session);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signInWithPassword = useCallback(
    async (email: string, password: string) => {
      if (!supabase) {
        return { error: new Error("Supabase не настроен") };
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      return { error };
    },
    [],
  );

  const signUpWithPassword = useCallback(
    async (email: string, password: string) => {
      if (!supabase) {
        return { error: new Error("Supabase не настроен") };
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/app`,
        },
      });

      return { error };
    },
    [],
  );

  const signOut = useCallback(async () => {
    if (!supabase) {
      return { error: null };
    }

    const { error } = await supabase.auth.signOut();

    return { error };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isConfigured: Boolean(supabase),
      isLoading,
      session,
      user: session?.user ?? null,
      signInWithPassword,
      signUpWithPassword,
      signOut,
    }),
    [isLoading, session, signInWithPassword, signOut, signUpWithPassword],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
