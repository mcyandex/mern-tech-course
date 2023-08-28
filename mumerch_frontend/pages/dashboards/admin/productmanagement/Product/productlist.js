import axios from "axios"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useAlert } from "../../../../utils/alertcontext"
const AdminLayout = dynamic(() => import("../../../../components/dashboards/admin/adminlayout"))
const Title = dynamic(() => import("../../../../components/title"))

export default function BandManagerList() {
  const [product, setProduct] = useState('')
  const [searchName, setSearchName] = useState('')
  const [users, setUsers] = useState('')
  const { showAlert } = useAlert()
  const router = useRouter()
  const handleChangeSearchName = (e) => {
    setSearchName(e.target.value);
  }
  const getProducts = async (e) => {
    try {
      const searchingName = searchName == undefined ? undefined : searchName
      const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'admin/getproductbyname/' + searchingName;
      const result = await axios.get(url, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: true
      })
      setProduct(result.data)
      if (result.data.length === 0) {
        showAlert('No Product found')
      }
      else {
        return result.data
      }
    }
    catch (err) {
      console.log(err)
      showAlert("Something went wrong, please try again letter")
    }
  };

  const handleUpdate = (id) => {
    router.push(`./updatebandmanager?id=${id}`)
  }
  const handleDelete = async (id) => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'admin/deleteproduct/' + id
      const result = await axios.delete(url, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: true
      })
      showAlert(result.data)
      getProducts()
    }
    catch (err) {
      showAlert('Couldnot perform delete operations, try again')
    }
  }
  useEffect(() => {
    getProducts();
  }, [searchName]);
  return (
    <>
      <Title page="Product List"></Title>
      <AdminLayout>
        <section class="bg-gray-50 dark:bg-gray-900 sm:p-5">
          <div class="mx-auto max-w-screen-xl">
            <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
              <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div class="w-full md:w-1/2">
                  <form class="flex items-center">
                    <label for="simple-search" class="sr-only">Search</label>
                    <div class="relative w-full">
                      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required onChange={handleChangeSearchName} />
                    </div>
                  </form>
                </div>
                <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  <Link href={'addproduct'} type="button" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Add product
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {Array.isArray(product) ? (
            <div class="relative py-2 overflow-x-auto shadow-md sm:rounded-lg">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-center">
                      No.
                    </th>
                    <th scope="col" class="px-6 py-3 text-center">
                      Name
                    </th>
                    <th scope="col" class="px-6 py-3 text-center">
                      Color Name
                    </th>
                    <th scope="col" class="px-6 py-3 text-center">
                      Size Name
                    </th>
                    <th scope="col" class="px-6 py-3 text-center">
                      Band Name
                    </th>
                    <th scope="col" class="px-6 py-3 text-center">
                      Price
                    </th>
                    <th scope="col" class="px-6 py-3 text-center">
                      Quantity
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                {product.map((item, index) => (
                  <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td class="px-6 py-4 text-center">
                        {index + 1}
                      </td>
                      <td class="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item.name}
                      </td>
                      {

                        item.size && item.size.name && item.color && item.product.band && item.product.band.name && item.product.price ?
                          (
                            <>
                            <td class="px-6 py-4 text-center">
                              {item.color.name}
                            </td>
                            <td class="px-6 py-4 text-center">
                              {item.size.name}
                            </td>
                            <td class="px-6 py-4 text-center">
                              {item.product.band.name}
                            </td>
                            <td class="px-6 py-4 text-center">
                              {item.product.price}
                            </td>
                            </>
                          ) : null
                      }
                      {console.log(item)}
                      <td class="px-6 py-4 text-center">
                        {item.quantity}
                      </td>
                      <td class="px-6 py-4 space-x-2 flex items-center">
                        <button onClick={() => handleUpdate(item.id)}>
                          <img src="/icons/update.png" alt='Update' width={15} height={15} />
                        </button>
                        <button onClick={() => handleDelete(item.id)}>
                          <img src="/icons/delete.png" alt='Delete' width={15} height={15} />
                        </button>
                        <Link href={`./${item.id}`}>
                          <img src="/icons/details.png" alt='Details' width={15} height={15} />
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          ) : (
            <div>No category created yet</div>
          )
          }
        </section>
      </AdminLayout>
    </>
  )
}