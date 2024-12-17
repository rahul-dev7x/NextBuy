import App from "@/App";
import SearchPage from "@/components/shared/SEarchPage";
import Home from "@/pages/Home";

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
        }
    ]
}])


export default router