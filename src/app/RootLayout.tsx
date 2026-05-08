import { Outlet } from "@tanstack/react-router";
import { AuthProvider } from "@/features/auth/AuthProvider";

export function RootLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
