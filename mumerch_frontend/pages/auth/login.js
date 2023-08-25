import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import { useAuth } from "../utils/authcontext";
import { useAlert } from "../utils/alertcontext";

const Title = dynamic(() => import("../components/title"))

export default function Login() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { login } = useAuth();
  const { showAlert } = useAlert()

  const handleChangeId = (e) => {
    setId(e.target.value)
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!id || !password) {
      showAlert('Id and password are required');
    }
    else {
      const data = await checkLogin(id, password)
      if (data != null) {
        login(data, document.cookie);
        if (data.userType == 'admin' || data.userType == 'employee' || data.userType == 'bandmanager' || data.userType == 'gigmanager') {
          router.push(`/dashboards/${data.userType}/${data.userType}dashboard`);
        }
        else {
          showAlert('User role not found, please contact admin')
        }
      }
      else {
        showAlert('User id or password not found')
      }
      setId('');
      setPassword('');
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
      showAlert("Something went wrong, please try again")
    }
  }

  return (
    <>
      <Title page='Login'></Title>
      <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-4 mx-auto md:h-screen lg:py-0  bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <Link href="/" class="flex items-center">
            <img class="w-32 h-16 ring-4 rounded-lg transition ease-in-out duration-300 transform hover:scale-105 hover:ring-blue-500" src="/logo/mumerch_logo.png" alt="MuMerch logo" />
          </Link>
          <div class="w-full">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-lg font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your ID</label>
                  <input type="text" name="id" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="MM-XXXX-XXXX" value={id} required onChange={handleChangeId} />
                </div>
                <div>
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={password} required onChange={handleChangePassword} />
                </div>
                <div class="flex items-center justify-between">
                  <Link href="forgetpassword" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</Link>
                </div>
                <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet? <Link href="signup" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}