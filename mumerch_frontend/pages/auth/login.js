import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from 'axios';

const Layout = dynamic(() => import("../components/homepage/layout"))
const Title = dynamic(() => import("../components/title"))

export default function Login() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleChangeId = (e) => {
    setId(e.target.value)
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!id || !password) {
      setError('Id and password are required');
    }
    else {
      const data = await login(id, password)
      if (data != null) {
        if (data.userType == 'admin') {
          router.push('/dashboards/admin/admindashboard');
        }
        else if (data.userType == 'employee') {
          router.push('/dashboards/employee/employeedashboard');
        }
        else if (data.userType == 'bandmanager') {
          router.push('/dashboards/bandmanager/bandmanagerdashboard');
        }
        else if (data.userType == 'gigmanager') {
          router.push('/dashboards/gigmanager/gigmanagerdashboard');
        }
        else {
          setError('User role not found, please contact admin')
        }
      }
      else {
        setError('User id or password not found')
      }
      setId('');
      setPassword('');
      setError('');
    }
  };
  async function login(id, password) {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL + 'auth/login'
      const jsonData = await axios.post(url, { id, password })
      return jsonData.data
    }
    catch (error) {
      console.log(error.message)
      setError("Something went wrong, please try again")
    }
  }

  return (
    <>
      <Title page='Login'></Title>
      <Layout>
        <div>
          <h3>Login</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>ID : </label>
              <input name="id" type="text" placeholder="Enter id" value={id} required onChange={handleChangeId} />
            </div>
            <div>
              <label>Password : </label>
              <input name="password" type="password" placeholder="Enter password" value={password} required onChange={handleChangePassword} />
            </div>
            <div>
              <Link href="forgetpassword">Forget Password</Link>
            </div>
            <div>
              <span>{error && <p>{error}</p>}</span>
            </div>
            <div>
              <input type="submit" />
            </div>
          </form>
          <div>
            <Link href="signup">Don't have an account, sign-up</Link>
          </div>
        </div>
      </Layout>
    </>
  )
}