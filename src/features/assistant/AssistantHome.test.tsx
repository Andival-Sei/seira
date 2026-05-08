import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/features/auth/AuthProvider";
import { i18n } from "@/i18n/i18n";
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
  beforeEach(async () => {
    await i18n.changeLanguage("ru");
  });

  it("renders the assistant shell", () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AssistantHome />
        </AuthProvider>
      </QueryClientProvider>,
    );

    expect(screen.getByText("Проверяем сессию")).toBeInTheDocument();
  });
});
