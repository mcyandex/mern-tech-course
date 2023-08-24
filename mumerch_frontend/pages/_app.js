import '../styles/globals.css'
import { AuthProvider } from './utils/authcontext'
import { AlertProvider } from './utils/alertcontext'

export default function App({ Component, pageProps }) {
  return (
    <AlertProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </AlertProvider>
  )
}
