import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


function Protected() {
    const {loading,user} = useAuth();
    if(loading){
        return <h1>Loading...</h1>
    }
    if(!user){
        return <Navigate to={"/login"}/>
    }
    return <Outlet />;
}

export default Protected;