import { render, screen } from "@testing-library/react";
import { AuthProvider } from "@/features/auth/AuthProvider";
import { i18n } from "@/i18n/i18n";
import { AuthPage } from "./AuthPage";

vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual<typeof import("@tanstack/react-router")>(
    "@tanstack/react-router",
  );

  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe("AuthPage", () => {
  beforeEach(async () => {
    await i18n.changeLanguage("ru");
  });

  it("renders login and registration controls", () => {
    render(
      <AuthProvider>
        <AuthPage />
      </AuthProvider>,
    );

    expect(screen.getByRole("heading", { name: "Seira" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Регистрация" }),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument();
  });
});
