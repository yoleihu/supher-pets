import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BloodCenter } from '../pages/BloodCenter'
import { Guardian } from '../pages/Guardian'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { RecoverPassword } from '../pages/RecoverPassword'
import { Register } from '../pages/Register'
import { AuthGuardian } from '../context/UserContext'
import { PrivateRoutes } from './PrivateRoutes'

export const PrincipalRoutes = () => {
  return (
    <BrowserRouter>
      <AuthGuardian>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/guardian/:id' element={<PrivateRoutes />}>
            <Route path='/guardian/:id' element={<Guardian />} />
          </Route>
          <Route path='/blood-center/:id' element={<PrivateRoutes />}>
            <Route path='/blood-center/:id' element={<BloodCenter />} />
          </Route>
        </Routes>
      </AuthGuardian>
      <Routes>
      </Routes>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recoverPassword' element={<RecoverPassword />} />
      </Routes>
    </BrowserRouter>
  )
}