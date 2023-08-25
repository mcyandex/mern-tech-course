import axios from "axios";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const Title = dynamic(() => import("../../../../components/title"));
const AdminLayout = dynamic(() => import("../../../../components/dashboards/admin/adminlayout"))

export default function UpdateColor() {
  const [color, setColor] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { id } = router.query;

  const getColorById = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'admin/getcolor/' + id;
      const response = await axios.get(url, {
        withCredentials: true
      });
      if (response != null) {
        setColor(response.data);
      } else {
        setError(`${id} not found`);
      }
    } catch (err) {
      console.log(err);
      router.push('./colorlist');
    }
  }

  useEffect(() => {
    if (!id) {
      router.push('./colorlist');
    } else {
      getColorById();
    }
  }, []);

  return (
    <>
      <Title page={'Color Details'}></Title>
      <AdminLayout>
        <section class="bg-white dark:bg-gray-900">
          <div class="py-4 px-4 mx-auto">
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Color Details
              </h3>
              <Link href={'./colorlist'} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="updateProductModal">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Close</span>
              </Link>
            </div>
            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div class="sm:col-span-2">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={color.name} />
              </div>
              <div class="sm:col-span-2">
                <label for="color" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Color Code</label>
                <div class="flex items-center py-1.5">
                  <input type="color" name="colorCode" id="color" class="w-full h-8 border border-gray-300 focus:ring-blue-600 focus:border-blue-600" value={color.colorCode} />
                </div>
              </div>
              {!color.login ? null : (
                <div class="sm:col-span-2">
                  <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Updated By</label>
                  <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={color.login.name} />
                </div>
              )}
            </div>
            <div class="flex items-center justify-center space-x-4 py-4">
              <Link href={'./colorlist'} class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                Back
              </Link>
            </div>
          </div>
        </section>
      </AdminLayout>
    </>
  )
}
