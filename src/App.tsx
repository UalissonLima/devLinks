import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { Admin } from "./pages/admin";
import { Login } from "./pages/login";
import { Networks } from "./pages/networks";
import { Private } from "./routes/Private";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Private>
        <Home />
      </Private>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <Private>
        <Admin />
      </Private>
    ),
  },

  {
    path: "/admin/social",
    element: (
      <Private>
        <Networks />
      </Private>
    ),
  },
]);

export { router };
