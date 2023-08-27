import dynamic from "next/dynamic"
import axios from "axios"
import Link from "next/link";
import { useEffect, useState } from 'react';
const GigManagerLayout = dynamic(() => import("../../components/dashboards/gigmanager/gigmanagerlayout"))
const Title = dynamic(() => import("../../components/title"))

export default function GigManagerDashboard() {
  const [counts, setCounts] = useState({});
  const getCounts = async (e) => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'admin/getcount';
      const result = await axios.get(url, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: true
      })
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
      <Title page="GigManager Dashboard"></Title>
      <GigManagerLayout>
        <div class="container px-4 py-4">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
            <Link href={'usermanagement/gigmanager/gigmanagerlist'}>
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
            <Link href={'customermanagement/customerlist'}>
              <div class="bg-white p-6 rounded-lg m-6 shadow-md text-center hover:bg-blue-300 transform hover:scale-105 transition duration-300 ease-in-out">
                <p class="text-gray-600 text-lg font-semibold">Customers:</p>
                <p class="text-4xl text-indigo-600 font-bold mt-2 hover:text-black">{counts.customer}</p>
              </div>
            </Link>
          </div>
        </div>
      </GigManagerLayout>
    </>
  )
}