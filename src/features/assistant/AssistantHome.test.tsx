import { render, screen } from "@testing-library/react";
import { AuthProvider } from "@/features/auth/AuthProvider";
import { AssistantHome } from "./AssistantHome";

vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual<typeof import("@tanstack/react-router")>(
    "@tanstack/react-router",
  );

  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe("AssistantHome", () => {
  it("renders the assistant shell", () => {
    render(
      <AuthProvider>
        <AssistantHome />
      </AuthProvider>,
    );

    expect(screen.getByText("Проверяем сессию")).toBeInTheDocument();
  });
});
