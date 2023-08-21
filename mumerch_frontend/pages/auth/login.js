import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import { useAuth } from "../utils/authcontext";

const Layout = dynamic(() => import("../components/homepage/layout"))
const Title = dynamic(() => import("../components/title"))

export default function Login() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const { login } = useAuth();

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
      const data = await checkLogin(id, password)
      if (data != null) {
        login(data, document.cookie);
        if (data.userType == 'admin' || data.userType == 'employee' || data.userType == 'bandmanager' || data.userType == 'gigmanager') {
          router.push({
            pathname: `/dashboards/${data.userType}/${data.userType}dashboard`,
            query: {
              uid: data.id,
              username: data.name
            }
          });
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
  async function checkLogin(id, password) {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'auth/login/'
      const jsonData = await axios.post(url, { id, password },
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          withCredentials: true
        })
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