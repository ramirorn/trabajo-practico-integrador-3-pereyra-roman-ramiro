import {Navigate,Outlet} from "react-router"

export const PublicRoutes = () => {
    return !isLogged ? <Outlet/> : <Navigate to={'/home'}/>
}