import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { AuthPage } from "./pages/authPage.jsx/AuthPage.jsx";
import { AccountPage } from "./pages/accountPage/accountPage";

const routes = [
  { path: "/auth", element: <AuthPage /> },
  { path: "/cuentas", element: <AccountPage /> },
  { path: "/*", element: <DashboardPage /> },
];

export default routes;
