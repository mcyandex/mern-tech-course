import dynamic from "next/dynamic"
import { useAlert } from "../../../utils/alertcontext"
const AdminLayout = dynamic(() => import("../../../components/dashboards/admin/adminlayout"))
const Title = dynamic(() => import("../../../components/title"))
import { useState } from "react"
import { useRouter } from "next/router"
export default function ChangePassword() {
  const [password, setPassword] = useState('')
  const [conpassword, setConPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [error, setError] = useState('')
  const { showAlert } = useAlert()
  const router = useRouter()
  const handleChangePassword = (e) => {
    const inputValue = e.target.value;
    if (!checkPassword(inputValue)) {
      setError('Password format not matched')
    }
    else {
      setError('')
    }
    setPassword(e.target.value);
  };
  const handleChangeOldPassword = (e) => {
    const inputValue = e.target.value;
    if (!checkPassword(inputValue)) {
      setError('Password format not matched')
    }
    else {
      setError('')
    }
    setOldPassword(e.target.value);
  };

  const handleChangeRetypePassword = (e) => {
    const inputValue = e.target.value;
    if (inputValue != password) {
      setError('Not matched with passwotd')
    }
    else {
      setError('')
    }
    setConPassword(e.target.value);

  };
  function checkPassword(data) {
    if (/^(?=.*[@$&!_-])[A-Za-z0-9@$&!_-]{6,}$/.test(data)) {
      return true
    }
    else {
      return false
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!password || !conpassword) {
      showAlert("Password and retype-Password are required");
    }
    else if (password !== conpassword) {
      showAlert("Passwords do not match");
    }
    else {
      try {
        const data = {
          oldPassword:oldPassword,
          password: password,
          reTypePassword:conpassword
        };
        const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'auth/changepassword/';
        const returnData = await axios.patch(url, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(url, returnData.data)
        if(returnData.data!=null){
          showAlert('Password changed successfully')
          router.push('/admindashboard')
        }
      }
      catch (err) {
        console.log(err);
        setError("User not found");
      }
    }
  }
  return (
    <>
      <Title page="Change Password"></Title>
      <AdminLayout>
        <div>
          <h6 className="text-xl font-semibold dark:text-white">Change Password</h6>
          <hr className="h-px bg-gray-200 border-1 dark:bg-gray-700" />
          <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Old Password</label>
              <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={handleChangeOldPassword} value={oldPassword} />
            </div>
            <div>
              <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New password</label>
              <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={handleChangePassword} value={password}/>
            </div>
            <div>
              <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
              <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={handleChangeRetypePassword} value={conpassword}/>
            </div>
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input id="newsletter" aria-describedby="newsletter" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required="" />
              </div>
              <div class="ml-3 text-sm">
                <label for="newsletter" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-blue-600 hover:underline dark:text-blue-500" href="#">Terms and Conditions</a></label>
              </div>
            </div>
            <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Reset passwod</button>
          </form>
        </div>
      </AdminLayout>
    </>
  )
}