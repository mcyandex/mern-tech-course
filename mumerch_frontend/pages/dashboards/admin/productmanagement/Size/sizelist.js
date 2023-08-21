import axios from "axios"
import dynamic from "next/dynamic"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
const AdminLayout = dynamic(() => import("../../../../components/dashboards/admin/adminlayout"))
const Title = dynamic(() => import("../../../../components/title"))

export default function SizeList() {
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')
  const [measurement, setMeasurement] = useState(0)
  const [searchName, setSearchName] = useState('')
  const [sizes, setSizes] = useState('')
  const [error, setError] = useState('')
  const [addionError, setAdditionError] = useState('')
  const [message, setMessage] = useState('')
  const [additionMessage, setAdditionMessage] = useState('')
  const router = useRouter()
  const handleChangeSearchName = (e) => {
    setSearchName(e.target.value);
  }
  const handleChangeName = (e) => {
    const inputValue = e.target.value;
    if (/^[A-Z][a-zA-z ]*$/.test(inputValue)) {
      setName(inputValue);
      setNameError('')
    }
    else {
      setNameError('Name should start with a capital letter')
    }
    if (inputValue == "") {
      setName('')
    }
  }
  const handleChangeMeasurement = (e) => {
    const value = parseInt(e.target.value)
    setMeasurement(isNaN(value) ? 0 : value);
  }
  const handleAdd = async (e) => {
    e.preventDefault()
    if (!name || !measurement) {
      setAdditionError('Must provide name and measurement properly')
    }
    else {
      const result = await addSize(name, measurement)
      if (result != null) {
        setAdditionMessage(`Size added successfully`)
        getSizes()
        setName('')
        setMeasurement(0)
      }
      else {
        setAdditionError(`Size Couldnot added`)
      }
      setName('')
      setMeasurement(0)
    }
  }
  async function addSize(name, measurement) {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'admin/addsize'
      const sizeData = {
        name: name,
        measurement: measurement,
        login: "MM-0723-0001"
      }
      const result = await axios.post(url, sizeData, {
        withCredentials: true
      });
      return result.data
    }
    catch (err) {
      console.log(err)
      setAdditionError('Something went wrong, try again')
    }
  }
  const getSizes = async (e) => {
    try {
      const searchingName = searchName == undefined ? undefined : searchName
      const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'admin/getsizebyname/' + searchingName;
      const result = await axios.get(url, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: true
      })
      setSizes(result.data)
      if (sizes.length == 0) {
        setError(`No size found in name: ${searchName}`)
      }
    }
    catch (err) {
      console.log(err)
      setError("Something went wrong, please try again letter")
    }
  };
  const handleUpdate = (id) => {
    router.push({
      pathname: `./updatesize`,
      query: {
        id: id
      }
    });
  }
  const handleDelete = async (id) => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'admin/deletesize/' + id
      const result = await axios.delete(url, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: true
      })
      setMessage(result.data)
      getSizes()
    }
    catch (err) {
      setError('Couldnot perform delete operations, try again')
    }
  }
  useEffect(() => {
    getSizes();
  }, [searchName]);

  // function Alert({ message }) {
  //   const [showAlert, setShowAlert] = useState(true);

  //   useEffect(() => {
  //     const timeout = setTimeout(() => {
  //       setShowAlert(false);
  //     }, 5000);

  //     return () => clearTimeout(timeout);
  //   }, []);

  //   return (
  //     showAlert && (
  //       <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4">
  //         <div className="bg-yellow-50 dark:bg-gray-800 dark:text-yellow-400 border border-yellow-300 dark:border-yellow-700 rounded-lg p-4 shadow-md relative">
  //           <p>{message}</p>
  //           <button
  //             type="button"
  //             className="absolute top-0 right-0 -mt-2 -mr-2 p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-200 focus:ring-2 focus:ring-red-400"
  //             onClick={() => setShowAlert(false)}
  //             aria-label="Close"
  //           >
  //             <span className="sr-only">Close</span>
  //             <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
  //               <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
  //             </svg>
  //           </button>
  //         </div>
  //       </div>
  //     )
  //   );
  // }


  return (
    <>
      <Title page="Size Corner"></Title>
      <AdminLayout>
        <div>
          <h6 className="text-xl font-semibold dark:text-white">Size Corner</h6>
          <hr className="h-px bg-gray-200 border-1 dark:bg-gray-700" />
          <div>
            <h6 className="text-md font-semibold text-center py-4">Add Size</h6>
            <form onSubmit={handleAdd}>
              <div>
                <div class="relative">
                  <input type="text" id="outlined_success" aria-describedby="outlined_success_help" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-green-600 appearance-none dark:text-white dark:border-green-500 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder="Name" required onChange={handleChangeName} value={name} />
                  <label for="outlined_success" class="absolute text-sm text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Name</label>
                </div>
                <p id="outlined_success_help" class="pb-2 mt-0.5 text-xs text-red-600 dark:text-red-400"><span class="font-medium">{nameError && <p>{nameError}</p>}</span></p>
              </div>
              <div>
                <div class="relative">
                  <input type="number" id="outlined_success" aria-describedby="outlined_success_help" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-green-600 appearance-none dark:text-white dark:border-green-500 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder="Chest measurement (in inch)" required onChange={handleChangeMeasurement} min={30} max={60} value={!measurement ? '' : measurement} />
                  <label for="outlined_success" class="absolute text-sm text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Chest Measurement (in inch)</label>
                </div>
              </div>
              <button type="submit" class="my-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
            </form>
            <span>{addionError && <p>{addionError}</p>}</span>
            <span>{additionMessage && <p>{additionMessage}</p>}</span>
          </div>
          <div>
            <div className="inline-flex items-center justify-center w-full">
              <div className="w-64 h-px my-8 bg-gray-300 border-0 dark:bg-gray-700"></div>
              <h6 className="text-md text-center font-semibold py-4">Size List</h6>
              <div className="w-64 h-px my-8 bg-gray-300 border-0 dark:bg-gray-700"></div>
            </div>
            <div>
              <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter size name" required onKeyUp={handleChangeSearchName} />
                <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
              </div>
              <span>{error && <p>{error}</p>}</span>
            </div>
            <span>{message && <p>{message}</p>}</span>
            {Array.isArray(sizes) ? (
              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                        Chest Measurement (inch)
                      </th>
                      <th scope="col" class="px-6 py-3 text-center">
                        Updated By
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  {sizes.map((item, index) => (
                    <tbody>
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="px-6 py-4 text-center">
                          {index + 1}
                        </td>
                        <td class="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {item.name}
                        </td>
                        <td class="px-6 py-4 text-center">
                          {item.measurement}
                        </td>
                        <td class="px-6 py-4 text-center">
                          {item.login.name}
                        </td>
                        <td class="px-6 py-4 space-x-2 flex items-center">
                          <button onClick={() => handleUpdate(item.id)}>
                            <Image src="/icons/update.png" alt='Update' width={15} height={15} />
                          </button>
                          <button onClick={() => handleDelete(item.id)}>
                            <Image src="/icons/delete.png" alt='Delete' width={15} height={15} />
                          </button>
                          <Link href={`./${item.id}`}>
                            <Image src="/icons/details.png" alt='Details' width={15} height={15} />
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>

              </div>
            ) : (
              <div>No sizes created yet</div>
            )
            }
          </div>
        </div>
      </AdminLayout>
    </>
  )
}