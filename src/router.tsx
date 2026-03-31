import { createBrowserRouter } from "react-router-dom";
import AppShell from "./layout/AppShell";
import Dashboard from "./pages/Dashboard";
import DataHub from "./pages/DataHub";
import Investments from "./pages/Investments";
import Marketplace from "./pages/Marketplace";
import PartnerDiscovery from "./pages/partners/PartnerDiscovery";
import CountryProfile from "./pages/markets/CountryProfile";
import Calculator from "./pages/Calculator";
import AIEngine from "./pages/AIEngine";
import AdminCMS from "./pages/admin/AdminCMS";
import SettingsPage from "./pages/SettingsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "data-hub", element: <DataHub /> },
      { path: "markets/country/:code", element: <CountryProfile /> },
      { path: "investments", element: <Investments /> },
      { path: "marketplace", element: <Marketplace /> },
      { path: "partners", element: <PartnerDiscovery /> },
      { path: "calculator", element: <Calculator /> },
      { path: "ai", element: <AIEngine /> },
      { path: "admin", element: <AdminCMS /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
]);
