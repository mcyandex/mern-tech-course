import Link from "next/link";

export default function Navigation() {
  return (
    <>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/" className="flex items-center">
            <img src="/logo/mumerch_logo.png" className="mr-3 h-14 sm:h-18" alt="MuMerch Logo" />
          </Link>
          <div className="flex items-center lg:order-2 space-x-4">
            <Link href="/auth/login"
              className="text-gray-800 dark:text-white hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
              Log in</Link>
            <Link href="/auth/signup"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Sign up
            </Link>
            <button data-collapse-toggle="mobile-menu-2" type="button"
              className="lg:hidden inline-flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
          <div className="hidden w-full lg:flex lg:w-auto lg:order-1 space-x-4" id="mobile-menu-2">
            <Link href="/"
              className="block py-2 pr-4 pl-3 font-semibold text-gray-700 border-b border-gray-100 hover:text-blue-700 lg:border-0 lg:hover:bg-transparent lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
              Home
            </Link>
            <Link href="/about"
              className="block py-2 pr-4 pl-3 font-semibold text-gray-700 border-b border-gray-100 hover:text-blue-700 lg:border-0 lg:hover:bg-transparent lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
              About
            </Link>
            <Link href="/contact"
              className="block py-2 pr-4 pl-3 font-semibold text-gray-700 border-b border-gray-100 hover:text-blue-700 lg:border-0 lg:hover:bg-transparent lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
