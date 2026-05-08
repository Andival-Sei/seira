import { createFileRoute } from "@tanstack/react-router";
import { AssistantHome } from "@/features/assistant/AssistantHome";

export const Route = createFileRoute("/app")({
  component: AssistantHome,
});
