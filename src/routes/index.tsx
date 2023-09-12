import { Navigate, createBrowserRouter } from "react-router-dom";
import Notfound from "../Notfound";
import Dashboard from "../pages/dashboard";
import Signin from "../pages/signin/index";
import Signup from "../pages/signup/index";
import Logout from "../pages/logout/index";
import Profile from "../pages/profile";
import ProtectedRoute, { InAccessableRoutes } from "./protectedRoute";


const router = createBrowserRouter([
    {
        path: "/",
        element: (<Navigate to="/dashboard"/>)
    },
    {
        path: "/dashboard",
        element: (<Dashboard/>)
    },
    {
        path: "/signin",
        element: (
        <InAccessableRoutes>

          <Signin/>
        </InAccessableRoutes>
        )
    },
    {
        path: "/signup",
        element: (
          <InAccessableRoutes>
        
        <Signup/>
        </InAccessableRoutes>
        )
    },
    { 
        path: "/logout", 
        element: <Logout /> 
      },
      {
        path: "/profile",
        element: (
        <ProtectedRoute>
        <Profile />
        </ProtectedRoute>
        
        )
      },
  {
    path: "*",
    element: (<Notfound/>)
  }
]);

export default router;