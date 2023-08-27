import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
const Layout = dynamic(() => import("../components/homepage/layout"));
const Title = dynamic(() => import("../components/title"));

export default function CheckForgetPasswordCode() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { uid } = router.query;

  useEffect(() => {
    if (!uid) {
      router.push("/forgetpassword");
    }
  }, [uid, router]);

  const handleChangeToken = (e) => {
    setToken(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeRetypePassword = (e) => {
    setRetypePassword(e.target.value);
  };

  const handleResendCode = async () => {
    try {
      const url =
        process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + `auth/forgetpassword/${uid}`;
      await axios.get(url);
    } catch (err) {
      setError("Something went wrong, try again");
    }
  };

  const handleForgetPasswordCode = async (e) => {
    e.preventDefault();
    if (!token || !password || !retypePassword) {
      setError("Token, Password, and Retype-Password are required");
    } 
    else if (password !== retypePassword) {
      setError("Passwords do not match");
    } 
    //console.log('hello');
    else {
      const data = await forgetPasswordCode(uid, token, password);
      if (data != null) {
        router.push("./login");
      } 
    else {
        setError("Password reset failed");
      }
      setToken("");
      setPassword("");
      setRetypePassword("");
    }
  };

  async function forgetPasswordCode(uid, token, password) {
    try {
      const data = {
        token: token,
        password: password,
      };
      const url =
        process.env.NEXT_PUBLIC_BACKEND_URL +
        `auth/checkforgetpasswordcode/${uid}`;
      const returnData = await axios.patch(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return returnData.data;
    } catch (err) {
      console.log(err);
      setError("User not found");
    }
  }

  return (
    <>
      <Title page="Verification" />
        <div className="flex flex-col items-center justify-center px-6 py-4 mx-auto md:h-screen lg:py-0 bg-white rounded-lg shadow-md dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <Link href="/" className="flex items-center">
            <img
              className="w-32 h-16 ring-4 rounded-lg transition transform hover:scale-105 hover:ring-blue-500"
              src="/logo/mumerch_logo.png"
              alt="MuMerch logo"
            />
          </Link>
          <div className="w-full">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-2xl font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Reset Password
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleForgetPasswordCode}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your ID
                  </label>
                  <input
                    type="text"
                    name="token"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="MM-XXXX-XXXX"
                    value={token}
                    required
                    onChange={handleChangeToken}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={password}
                    required
                    onChange={handleChangePassword}
                  />
                </div>
                <div>
                  <label htmlFor="retypePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Retype Password
                  </label>
                  <input
                    type="password"
                    name="retypePassword"
                    id="retypePassword"
                    placeholder="Re-type Password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={retypePassword}
                    required
                    onChange={handleChangeRetypePassword}
                  />
                </div>
                <div>
                  <span>{error && <p>{error}</p>}</span>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Reset Password
                </button>
              </form>
              <div>
                <button
                  type="button"
                  name="resend"
                  onClick={handleResendCode}
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Resend Code
                </button>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
