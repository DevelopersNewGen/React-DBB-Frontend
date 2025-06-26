import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { AuthPage } from "./pages/authPage.jsx/AuthPage.jsx";
import { AccountPage } from "./pages/accountPage/accountPage";
import { UserTablePage } from "./pages/user/UserTablePage";
import { TransferPage } from "./pages/movemnts/TransferPage";
import CreateAccountForm from "./components/account/CreateAccountForm"; 

const routes = [
  { path: "/auth", element: <AuthPage /> },
  { path: "/cuentas", element: <AccountPage /> },
  { path: "/clientes", element: <UserTablePage /> },
  { path: "/transferir", element: <TransferPage /> },
  { path: "/create-account/:uid", element: <CreateAccountForm /> },
  { path: "/*", element: <DashboardPage /> },
];

export default routes;