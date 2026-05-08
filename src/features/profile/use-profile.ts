import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export function useProfile(userId: string | undefined) {
  return useQuery({
    queryKey: ["profile", userId],
    enabled: Boolean(supabase && userId),
    queryFn: async () => {
      if (!supabase || !userId) {
        throw new Error("Профиль недоступен без активной сессии");
      }

      const { data, error } = await supabase
        .from("profiles")
        .select(
          "id,email,display_name,avatar_url,locale,timezone,created_at,updated_at",
        )
        .eq("id", userId)
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
  });
}
