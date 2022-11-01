import ReactDOM from 'react-dom/client'
import { PrincipalRoutes } from './routes/PrincipalRoutes'
import supherClient from './service/SupherClient'
import './styles/global.css'

const root = ReactDOM.createRoot(document.getElementById('root')!)

supherClient.defineInterceptors()

root.render(
  <PrincipalRoutes />
)