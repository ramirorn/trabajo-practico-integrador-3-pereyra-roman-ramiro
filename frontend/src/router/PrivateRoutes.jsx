import {Navigate,Outlet} from "react-router"

export const PrivateRoutes = () => {
    return isLogged ? <Outlet/> : <Navigate to={'/login'}/>
}