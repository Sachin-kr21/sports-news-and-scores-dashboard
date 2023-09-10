import { Navigate, createBrowserRouter } from "react-router-dom";
import Notfound from "../Notfound";
import Dashboard from "../pages/dashboard";
import Signin from "../signin/index";
import Signup from "../signup/index";
import Logout from "../pages/logout/index";


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
        element: (<Signin/>)
    },
    {
        path: "/signup",
        element: (<Signup/>)
    },
    { 
        path: "/logout", 
        element: <Logout /> 
      },
  {
    path: "*",
    element: (<Notfound/>)
  }
]);

export default router;