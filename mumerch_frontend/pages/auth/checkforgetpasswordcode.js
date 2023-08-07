import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
const Layout = dynamic(() => import("../components/homepage/layout"))
const Title = dynamic(() => import("../components/title"))

export default function CheckForgerPasswordCode() {
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [retypepassword, setRetypePassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const { uid } = router.query

  useEffect(() => {
    if (!uid) {
      router.push("./forgetpassword")
    }
  })

  const handleChangeToken = (e) => {
    setToken(e.target.value)
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  };
  const handleChangeRetypePassword = (e) => {
    setRetypePassword(e.target.value)
  };
  const handleResendCode = async (e) => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + `auth/forgetpassword/${uid}`
      await axios.get(url)
    }
    catch (err) {
      setError('Something went wrong, try again')
    }
  }
  const hangleForgetPasswordCode = async (e) => {
    e.preventDefault()
    if (!token || !password || !retypepassword) {
      setError('Token, Password and Retype-Password is required')
    }
    else {
      const data = await forgetpasswordCode(uid, token, password)
      if (data != null) {
        router.push('./login')
      }
      else {
        setError('Enter corrent user ID')
      }
      setToken('')
      setPassword('')
      setRetypePassword('')
      setError('')
    }
  };
  async function forgetpasswordCode(uid, token, password) {
    try {
      const data = {
        token: token,
        password: password
      };
      const url = process.env.NEXT_PUBLIC_BACKEND_URL + `auth/checkforgetpasswordcode/${uid}`
      console.log(url)
      const returnData = await axios.patch(url, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return returnData.data
    }
    catch (err) {
      console.log(err)
      setError('User not found')
    }
  }

  return (
    <>
      <Title page='Verification'></Title>
      <Layout>
        <div>
          <h3>Verification</h3>
          <form onSubmit={hangleForgetPasswordCode}>
            <div>
              <label>Token : </label>
              <input name="token" type="text" placeholder="Enter Token" onChange={handleChangeToken} />
            </div>
            <div>
              <label>ID : </label>
              <input name="password" type="password" placeholder="Enter Password" onChange={handleChangePassword} />
            </div>
            <div>
              <label>ID : </label>
              <input name="retypepassword" type="password" placeholder="Re-type Password" onChange={handleChangeRetypePassword} />
            </div>
            <div>
              <span>{error && <p>{error}</p>}</span>
            </div>
            <input type="submit" />
          </form>
          <div>
            <input type="submit" name="resend" value="Resend Code" onClick={handleResendCode} />
          </div>
        </div>
      </Layout>
    </>
  )
}