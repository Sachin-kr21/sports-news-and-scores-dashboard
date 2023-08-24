import { Navigate, createBrowserRouter } from "react-router-dom";
import Notfound from "../Notfound";
import Dashboard from "../dashboard";
import Signin from "../signin";
import Signup from "../signup";
import Logout from "../logout";


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