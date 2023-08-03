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
      console.log(id, password)
      const data = await createUser(id, password)
      if (data == true) {
        router.push('/dashboards/admin/admindashboard');
      }
      else {
        setError('User id or password not found')
      }
      setId('');
      setPassword('');
    }
  };
  async function createUser(id, password) {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL+'auth/login'
      const jsonData = await axios.post(url, { id, password })
      return jsonData.data
    }
    catch (error) {
      console.log("error22: " + error.message)
      setError("invalid login")
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
              <label>Id : </label>
              <br />
              <input name="id" type="text" placeholder="Enter id" value={id} required onChange={handleChangeId} />
            </div>
            <div>
              <label>Password : </label>
              <br />
              <input name="password" type="password" placeholder="Enter password" value={password} required onChange={handleChangePassword} />
            </div>
            <Link href="forgetpassword">Forget Password</Link>
            <span>{error && <p>{error}</p>}</span>
            <input type="submit" />
          </form>
          <div>
            <Link href="signup">Don't have an account, sign-up</Link>
          </div>
        </div>
      </Layout>
    </>
  )
}