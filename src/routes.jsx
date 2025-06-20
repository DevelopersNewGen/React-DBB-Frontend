import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { AuthPage } from "./pages/auth/AuthPage";
import UserTablePage from "./pages/user/UserTablePage";

const routes = [
  { path: "/auth", element: <AuthPage /> },
  { path: "/users", element: <UserTablePage /> },
  { path: "/*", element: <DashboardPage /> },
];

export default routes;