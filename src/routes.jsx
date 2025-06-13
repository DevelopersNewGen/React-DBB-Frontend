import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { AuthPage } from "./pages/authPage.jsx/AuthPage.jsx";

const routes = [
  { path: "/auth", element: <AuthPage /> },
  { path: "/*", element: <DashboardPage /> },
];

export default routes;