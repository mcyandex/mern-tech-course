import dynamic from "next/dynamic"
import axios from "axios"
import Link from "next/link";
import { useEffect, useState } from 'react';
const EmployeeLayout = dynamic(() => import("../../components/dashboards/employee/employeelayout"))
const Title = dynamic(() => import("../../components/title"))

export default function EmployeeDashboard() {
  const [counts, setCounts] = useState({});
  const getCounts = async (e) => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'employee/getcount';//backend update
      const result = await axios.get(url, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: true
      })
      console.log(url, result, result.data)
      setCounts(result.data)
    }
    catch (err) {
      console.log(err)
    }
  };
  useEffect(() => {
    getCounts();
  }, []);
  return (
    <>
      <Title page="Employee Dashboard"></Title>
      <EmployeeLayout>
        <div class="container px-4 py-4">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
            <Link href={'./usermanagement/admin/adminlist'}>
              <div class="bg-white p-6 rounded-lg m-6 shadow-md text-center hover:bg-blue-300 transform hover:scale-105 transition duration-300 ease-in-out">
                <p class="text-gray-600 text-lg font-semibold">Admins:</p>
                <p class="text-4xl text-indigo-600 font-bold mt-2 hover:text-black">{counts.admin}</p>
              </div>
            </Link>
            <Link href={'./usermanagement/employee/employeelist'}>
              <div class="bg-white p-6 rounded-lg m-6 shadow-md text-center hover:bg-blue-300 transform hover:scale-105 transition duration-300 ease-in-out">
                <p class="text-gray-600 text-lg font-semibold">Employees:</p>
                <p class="text-4xl text-indigo-600 font-bold mt-2 hover:text-black">{counts.employee}</p>
              </div>
            </Link>
            <Link href={'./usermanagement/bandmanager/bandmanagerlist'}>
              <div class="bg-white p-6 rounded-lg m-6 shadow-md text-center hover:bg-blue-300 transform hover:scale-105 transition duration-300 ease-in-out">
                <p class="text-gray-600 text-lg font-semibold">Band_Managers:</p>
                <p class="text-4xl text-indigo-600 font-bold mt-2 hover:text-black">{counts.bandManager}</p>
              </div>
            </Link>
            <Link href={'./usermanagement/gigmanager/gigmanagerlist'}>
              <div class="bg-white p-6 rounded-lg m-6 shadow-md text-center hover:bg-blue-300 transform hover:scale-105 transition duration-300 ease-in-out">
                <p class="text-gray-600 text-lg font-semibold">Gig_Managers:</p>
                <p class="text-4xl text-indigo-600 font-bold mt-2 hover:text-black">{counts.gigManager}</p>
              </div>
            </Link>
            <Link href={'bandmanagement/bandlist'}>
              <div class="bg-white p-6 rounded-lg m-6 shadow-md text-center hover:bg-blue-300 transform hover:scale-105 transition duration-300 ease-in-out">
                <p class="text-gray-600 text-lg font-semibold">Bands:</p>
                <p class="text-4xl text-indigo-600 font-bold mt-2 hover:text-black">{counts.band}</p>
              </div>
            </Link>
            <Link href={'gigmanagement/giglist'}>
              <div class="bg-white p-6 rounded-lg m-6 shadow-md text-center hover:bg-blue-300 transform hover:scale-105 transition duration-300 ease-in-out">
                <p class="text-gray-600 text-lg font-semibold">Events:</p>
                <p class="text-4xl text-indigo-600 font-bold mt-2 hover:text-black">{counts.gig}</p>
              </div>
            </Link>
            <Link href={'productmanagement/product/productlist'}>
              <div class="bg-white p-6 rounded-lg m-6 shadow-md text-center hover:bg-blue-300 transform hover:scale-105 transition duration-300 ease-in-out">
                <p class="text-gray-600 text-lg font-semibold">Products:</p>
                <p class="text-4xl text-indigo-600 font-bold mt-2 hover:text-black">{counts.product}</p>
              </div>
            </Link>
            <Link href={'customermanagement/customerlist'}>
              <div class="bg-white p-6 rounded-lg m-6 shadow-md text-center hover:bg-blue-300 transform hover:scale-105 transition duration-300 ease-in-out">
                <p class="text-gray-600 text-lg font-semibold">Customers:</p>
                <p class="text-4xl text-indigo-600 font-bold mt-2 hover:text-black">{counts.customer}</p>
              </div>
            </Link>
          </div>
        </div>
      </EmployeeLayout>
    </>
  )
}