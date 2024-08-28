import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Layout from "../components/Layout/Layout"
import PublicRoutes from "./PublicRoutes"
import PrivateRoutes from "./PrivateRoutes"
import Login from "../pages/Login/Login"
import Register from "../pages/Register/Register"
import NoMatch from "../pages/NoMatch/NoMatch"
import Details from "../pages/Details/Details"
import Feed from "../pages/Feed/Feed"
import Profile from "../pages/Profile/Profile"
 
 
const AppRouter = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route path="*" element={<NoMatch /> } />
                  <Route element={<PublicRoutes isAuthenticated={false} />}>
                      <Route path="login" element={<Login />} />
                      <Route path="register" element={<Register /> } />
                  </Route>
                  <Route element={<PrivateRoutes isAuthenticated={true} />}>
                      <Route index element={<Feed />} />
                      <Route path="details/:" element={<Details /> } />
                      <Route path="Profile" element={<Profile /> } />
                  </Route>
              </Route>
          </Routes>
    </Router>
  )
}
 
export default AppRouter