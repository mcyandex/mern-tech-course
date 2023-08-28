import dynamic from "next/dynamic"
const BandManagerLayout = dynamic(() => import("../../../components/dashboards/bandmanager/bandmanagerlayout"))
const Title = dynamic(() => import("../../../components/title"))


export default function ChangePassword() {
  return (
    <>
      <Title page="Change Password"></Title>
      <BandManagerLayout>
        <div>
        <h6 className="text-xl font-semibold dark:text-white">Change Password</h6>
          <hr className="h-px bg-gray-200 border-1 dark:bg-gray-700" />
          <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
              <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
            </div>
            <div>
              <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
              <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
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
      </BandManagerLayout>
    </>
  )

}