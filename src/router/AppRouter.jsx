import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Layout from "../components/Layout/Layout"
import PublicRoutes from "./PublicRoutes"
import PrivateRoutes from "./PrivateRoutes"
import Login from "../pages/Login/Login"
import Register from "../pages/Register/Register"
import NoMatch from "../pages/NoMatch/NoMatch"
import Details from "../pages/Details/Details"
import Feed from "../pages/Feed/Feed"
import useAppContext from "../hooks/useAppContext";
import Profile from "../pages/Profile/Profile"


const AppRouter = () => {
    const { user } = useAppContext();
    return (
        <Router>
            <Routes>
                <Route element={<PublicRoutes isAuthenticated={user.isAuth} />}>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="*" element={<NoMatch />} />
                </Route>
                <Route path="/" element={<Layout />}>
                    <Route element={<PrivateRoutes isAuthenticated={user.isAuth} />}>
                        <Route index element={<Feed />} />
                        <Route path="details/:id" element={<Details />} />
                        <Route path="Profile" element={<Profile />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    )
}

export default AppRouter