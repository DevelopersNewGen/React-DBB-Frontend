import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { AuthPage } from "./pages/auth/AuthPage";
import { UserTablePage } from "./pages/user/UserTablePage";
import { UserDetailsPage } from "./pages/user/UserDetailsPage";
import { AccountPage } from "./pages/accountPage/accountPage";
import CreateAccountForm from "./components/account/CreateAccountForm"; 
import  FavoritePage  from "./pages/user/FavoritePage"; 
import { ProductsPage } from "./pages/products/ProductsPage";
import { TransferPage } from "./pages/movemnts/TransferPage";
import { MovementsPage } from "./pages/movemnts/MovementsPage.jsx";
import { AccountMovements } from "./pages/movemnts/AccountMovements.jsx";
import CreateAccountForm from "./components/account/CreateAccountForm"; 
import  MakeDepositPage  from "./pages/movemnts/MakeDepositPage.jsx";
import MakeWithdrawalPage from "./pages/movemnts/MakeWithdrawalPage.jsx";

const routes = [
  { path: "/auth", element: <AuthPage /> },
  { path: "/clientes", element: <UserTablePage /> },
  { path: "/servicios", element: <ProductsPage /> },
  { path: "/profile", element: <UserDetailsPage /> }, 
  { path: "/*", element: <DashboardPage /> },
  { path: "/favoritos", element: <FavoritePage /> },
  { path: "/cuentas", element: <AccountPage /> },
  { path: "/create-account/:uid", element: <CreateAccountForm /> },
  { path: "/depositar", element: <MakeDepositPage /> },
  { path: "/*", element: <DashboardPage /> },
  { path: "/retirar", element: <MakeWithdrawalPage /> },
  { path: "/movimientos/:accountId", element: <MovementsPage /> },
  { path: "/movimientos/cuenta/:accountId", element: <AccountMovements /> },
  { path: "/movimientos", element: <MovementsPage /> }

export default routes;