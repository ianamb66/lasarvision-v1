import { createBrowserRouter } from "react-router-dom";
import AppShell from "./layout/AppShell";
import Dashboard from "./pages/Dashboard";
import Investments from "./pages/Investments";
import Marketplace from "./pages/Marketplace";
import Calculator from "./pages/Calculator";
import AIEngine from "./pages/AIEngine";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "investments", element: <Investments /> },
      { path: "marketplace", element: <Marketplace /> },
      { path: "calculator", element: <Calculator /> },
      { path: "ai", element: <AIEngine /> },
    ],
  },
]);
