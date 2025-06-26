import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { AuthPage } from "./pages/auth/AuthPage";
import { UserTablePage } from "./pages/user/UserTablePage";
import { UserDetailsPage } from "./pages/user/UserDetailsPage"; // <-- importa la nueva page

const routes = [
  { path: "/auth", element: <AuthPage /> },
  { path: "/clientes", element: <UserTablePage /> },
  { path: "/profile", element: <UserDetailsPage /> }, // <-- agrega la ruta
  { path: "/*", element: <DashboardPage /> },
];

export default routes;