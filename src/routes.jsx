import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { AuthPage } from "./pages/auth/AuthPage";
import { UserTablePage } from "./pages/user/UserTablePage";
import { UserDetailsPage } from "./pages/user/UserDetailsPage";
import { AccountPage } from "./pages/accountPage/accountPage";
import CreateAccountForm from "./components/account/CreateAccountForm"; 
import  FavoritePage  from "./pages/user/FavoritePage"; 

const routes = [
  { path: "/auth", element: <AuthPage /> },
  { path: "/clientes", element: <UserTablePage /> },
  { path: "/profile", element: <UserDetailsPage /> }, 
  { path: "/*", element: <DashboardPage /> },
  { path: "/favoritos", element: <FavoritePage /> },
  { path: "/cuentas", element: <AccountPage /> },
  { path: "/create-account/:uid", element: <CreateAccountForm /> },
];

export default routes;