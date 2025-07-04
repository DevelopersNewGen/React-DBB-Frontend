import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { AuthPage } from "./pages/auth/AuthPage";
import { UserTablePage } from "./pages/user/UserTablePage";
import { UserDetailsPage } from "./pages/user/UserDetailsPage"; // <-- importa la nueva page
import  FavoritePage  from "./pages/user/FavoritePage"; 
import { ProductsPage } from "./pages/products/ProductsPage";
import { ExchangePage } from "./pages/exchange/ExchangeCardPage";;

const routes = [
  { path: "/auth", element: <AuthPage /> },
  { path: "/clientes", element: <UserTablePage /> },
  { path: "/profile", element: <UserDetailsPage /> }, // <-- agrega la ruta
  { path: "/servicios", element: <ProductsPage /> },
  { path: "/*", element: <DashboardPage /> },
  { path: "/favoritos", element: <FavoritePage /> },
  {path: "/exchange", element: <ExchangePage /> } 
];

export default routes;