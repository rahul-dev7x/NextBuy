import App from "@/App";
import ForgotPassword from "@/pages/ForgotPassword";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import OtpVerification from "@/pages/OtpVerification";
import Register from "@/pages/Register";
import ResetPassword from "@/pages/ResetPassword";
import SearchPage from "@/pages/SearchPage";

import { createBrowserRouter } from "react-router-dom";

const router =createBrowserRouter([{
    path:"/",
    element:<App/>,
    children:[
        {
        path:"",
        element:<Home/>
        },
        {
            path:"search",
            element:<SearchPage/>
        },
        {
            path:"login",
            element:<Login/>
        },{
            path:"register",
            element:<Register/>
        },
        {
            path:"forgot-password",
            element:<ForgotPassword/>
        },
        {
            path:"otp-verification",
            element:<OtpVerification/>
        },
        {
            path:"reset-password",
            element:<ResetPassword/>
        }
    ]
}])


export default router