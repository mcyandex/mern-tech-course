import Link from "next/link";
import { useState } from "react";

export default function VerticalNav() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
 // const [dropdownVisibleUser, setDropdownVisibleUser] = useState(false);
  const [dropdownVisibleProduct, setDropdownVisibleProduct] = useState(false);
  const [dropdownVisibleReport, setDropdownVisibleReport] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // const toggleDropdownUser = () => {
  //   setDropdownVisibleUser(!dropdownVisibleUser);
  // };
  const toggleDropdownProduct = () => {
    setDropdownVisibleProduct(!dropdownVisibleProduct);
  };
  const toggleDropdownReport = () => {
    setDropdownVisibleReport(!dropdownVisibleReport);
  };

  return (
    <>
      <button onClick={toggleSidebar} aria-controls="sidebar-multi-level-sidebar" type="button"
        className="inline-flex items-center px-8 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-100 dark:focus:bg-gray-100">
        <span className="sr-only">Open sidebar</span>
        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd" fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
          </path>
        </svg>
      </button>
      <aside id="sidebar-multi-level-sidebar" className={`absolute top-15 px-8 py-4 left-0 z-40 w-80 h-screen transition-transform
        ${sidebarVisible ? "" : "-translate-x-full"} sm:translate-x-0`} aria-label="Sidebar">
        <div class="px-3 py-3 overflow-y-auto dark:bg-gray-800 bg-gray-100 rounded-md">
          <ul class="space-y-2 font-medium">
            <li>
              <button type="button"
                onClick={toggleDropdownProduct}
                class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-blue-400 bg-gray-200"
                aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                  <path
                    d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                </svg>
                <span class="flex-1 ml-3 text-left whitespace-nowrap">Product Management</span>
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 4 4 4-4" />
                </svg>
              </button>
              <ul id="dropdown-example" className={`${dropdownVisibleProduct ? "" : "hidden"
                } py-2 space-y-2`}>
                <li>
                  <Link href="/dashboards/bandmanager/productmanagement/product/productlist"
                    class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-400">Product</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/dashboards/bandmanager/gigmanagement/giglist"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-400 bg-gray-200 group">
                <svg
                  class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
                </svg>
                <span class="flex-1 ml-3 whitespace-nowrap">Gig Management</span>
              </Link>
            </li>
            <li>
              <Link href="/dashboards/bandmanager/ordermanagement/orderlist"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-400 bg-gray-200 group">
                <svg
                  class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm1-4H5m0 0L3 4m0 0h5.501M3 4l-.792-3H1m11 3h6m-3 3V1" />
                </svg>
                <span class="flex-1 ml-3 whitespace-nowrap">Order Management</span>
              </Link>
            </li>
            <li>
              <Link href="/dashboards/bandmanager/customermanagement/customerlist"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-400 bg-gray-200 group">
                <svg
                  class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
                  <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z" />
                </svg>
                <span class="flex-1 ml-3 whitespace-nowrap">Customer Management</span>
              </Link>
            </li>
            <li>
              <button type="button"
                onClick={toggleDropdownReport}
                class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-blue-400 bg-gray-200"
                aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                  <path d="M18.972.863a.913.913 0 0 0-.041-.207.956.956 0 0 0-.107-.19 1.01 1.01 0 0 0-.065-.116c-.008-.01-.02-.013-.028-.022a1.008 1.008 0 0 0-.174-.137 1.085 1.085 0 0 0-.141-.095 1.051 1.051 0 0 0-.171-.047.985.985 0 0 0-.207-.041C18.025.007 18.014 0 18 0h-3.207a1 1 0 1 0 0 2h.5l-4.552 3.9-3.5-.874a1 1 0 0 0-.867.189l-5 4a1 1 0 0 0 1.25 1.562L7.238 7.09l3.52.88a1 1 0 0 0 .892-.211L17 3.173v1.034a1 1 0 0 0 2 0V1a.9.9 0 0 0-.028-.137ZM13.5 9a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Zm.24 4.591a3.112 3.112 0 0 1 1.935 1.374 2.036 2.036 0 0 1 .234 1.584 2.255 2.255 0 0 1-1.374 1.469.982.982 0 0 1-1.953.09 2.943 2.943 0 0 1-1.475-.92 1 1 0 0 1 1.536-1.283.953.953 0 0 0 .507.29.778.778 0 0 0 .831-.18 1.108 1.108 0 0 0-.714-.481 3.105 3.105 0 0 1-1.934-1.374 2.042 2.042 0 0 1-.233-1.584 2.264 2.264 0 0 1 1.45-1.493v-.03a1 1 0 0 1 2 0c.517.159.98.457 1.337.862a1.002 1.002 0 1 1-1.524 1.3.962.962 0 0 0-.507-.286.775.775 0 0 0-.829.18 1.113 1.113 0 0 0 .713.482ZM6 20a1 1 0 0 1-1-1v-6a1 1 0 1 1 2 0v6a1 1 0 0 1-1 1Zm-4 0a1 1 0 0 1-1-1v-4a1 1 0 1 1 2 0v4a1 1 0 0 1-1 1Z" />
                </svg>
                <span class="flex-1 ml-3 text-left whitespace-nowrap">Reports</span>
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 4 4 4-4" />
                </svg>
              </button>
              <ul id="dropdown-example" className={`${dropdownVisibleReport ? "" : "hidden"
                } py-2 space-y-2`}>
                <li>
                  <Link href="/dashboards/bandmanager/reports/salesreport"
                    class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-400">Sales Report</Link>
                </li>
                <li>
                  <Link href="/dashboards/bandmanager/reports/revenuereport"
                    class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-400">Revenue Report</Link>
                </li>
                <li>
                  <Link href="/dashboards/bandmanager/reports/barchart"
                    class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-400">Bar Charts</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-400 bg-gray-200 group">
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                </svg>
                <span class="flex-1 ml-3 whitespace-nowrap">Inbox</span>
                <span
                  class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  )
}