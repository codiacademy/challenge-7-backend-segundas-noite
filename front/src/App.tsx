import { Toaster } from "sonner";
import { AppRoutes } from "./Routes/AppRoutes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryclient } from "./lib/reactQuery.ts";

export function App() {
  return (
    <QueryClientProvider client={queryclient}>
      <AppRoutes />
      <Toaster duration={3000} richColors />
    </QueryClientProvider>
  );
}
