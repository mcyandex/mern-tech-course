import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
const Layout = dynamic(() => import("../components/homepage/layout"))
const Title = dynamic(() => import("../components/title"))

export default function ForgerPassword(props) {
  const [id, setId] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleChangeId = (e) => {
    setId(e.target.value)
  };
  const hangleForgetPassword = async (e) => {
    e.preventDefault()
    if (!id) {
      setError('ID is required')
    }
    else {
      const data = await forgetpassword(id)
      if (data != null) {
        router.push({
          pathname:'./checkforgetpasswordcode',
          query:{uid:id}
        })
      }
      else {
        setError('Enter corrent user ID')
      }
      setId('')
      setError('')
    }
  };
  async function forgetpassword(id) {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL + `auth/forgetpassword/${id}`
      const returnData = await axios.get(url)
      return returnData.data
    }
    catch (err) {
      console.log(err)
      setError('User not found')
    }
  }
  return (
    <>
      <Title page='Forget Password'></Title>
      <Layout>
        <div>
          <h3>Forget Password</h3>
          <form onSubmit={hangleForgetPassword}>
            <div>
              <label>ID : </label>
              <input name="id" type="text" placeholder="Enter ID" onChange={handleChangeId} />
            </div>
            <div>
              <span>{error && <p>{error}</p>}</span>
            </div>
            <input type="submit" value="Enter"/>
          </form>
          <div>
            <Link href="login">Go back to Login</Link>
          </div>
        </div>
      </Layout>
    </>
  )
}