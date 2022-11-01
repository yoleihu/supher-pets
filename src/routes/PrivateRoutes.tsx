import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { UserContext } from "../context/UserContext"

export const PrivateRoutes = () => {
  const { authenticatedGuardian, authenticatedBloodCenter } = useContext(UserContext)

  if(authenticatedGuardian) {
    return <Outlet />
  } else if(authenticatedBloodCenter) {
    return <Outlet />
  } else {
    return <Navigate to="/login" />
  }
}