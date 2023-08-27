import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
const Layout = dynamic(() => import("../components/homepage/layout"))
const Title = dynamic(() => import("../components/title"))

export default function ForgerPassword() {
  const [id, setId] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()


  const handleChangeId = (e) => {
    setId(e.target.value)
  };
  console.log(id)
  const hangleForgetPassword = async (e) => {
    e.preventDefault()
    if (!id) {
      setError('ID is required')
    }
    else {
      const data = await forgetpassword(id)
      if (data != null) {
        router.push(`./checkforgetpasswordcode?id=${id}`)
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
      const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + `auth/forgetpassword/${id}`
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
      <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-4 mx-auto md:h-screen lg:py-0  bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <Link href="/" class="flex items-center">
            <img class="w-32 h-16 ring-4 rounded-lg transition ease-in-out duration-300 transform hover:scale-105 hover:ring-blue-500" src="/logo/mumerch_logo.png" alt="MuMerch logo" />
          </Link>
          <div class="w-full">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-lg font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Forget Password
              </h1>
              <form class="space-y-4 md:space-y-6" onSubmit={hangleForgetPassword}>
                <div>
                  <label for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your ID</label>
                  <input type="text" name="id" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="MM-XXXX-XXXX" value={id} required onChange={handleChangeId} />
                </div>
                <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enter</button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet? <Link href="signup" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Layout>
        <div>
          <h3>Forget Password</h3>
          <form >
            <div>
              <label>ID : </label>
              <input name="id" type="text" placeholder="Enter ID"  />
            </div>
            <div>
              <span>{error && <p>{error}</p>}</span>
            </div>
            <input type="submit" value="Enter" />
          </form>
          <div>
            <Link href="login">Go back to Login</Link>
          </div>
        </div>
      </Layout>
    </>
  )
}