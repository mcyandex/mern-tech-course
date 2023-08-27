import axios from "axios"
import dynamic from "next/dynamic"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useAlert } from "../../../utils/alertcontext"
const AdminLayout = dynamic(() => import("../../../components/dashboards/admin/adminlayout"))
const Title = dynamic(() => import("../../../components/title"))

export default function BandList() {
  const [name, setName] = useState('')
  const [image, setImage] = useState(null)
  const [nameError, setNameError] = useState('')
  const [colorCode, setColorCode] = useState('')
  const [searchName, setSearchName] = useState('')
  const [colors, setColors] = useState('')
  const [bands, setBands] = useState('')
  const { showAlert } = useAlert()
  const router = useRouter()
  const handleChangeSearchName = (e) => {
    setSearchName(e.target.value);
  }
  const handleChangeImage = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
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
  const handleChangeColorCode = (e) => {
    setColorCode(e.target.value);
  }
  const handleAdd = async (e) => {
    e.preventDefault()
    if (!name && !image) {
      showAlert('Must provide name and colorCode properly');
    } else {
      console.log("Selected Image:", image); // Add this line
      const result = await addBand(name, image)
      console.log(name, result)
      if (result != null) {
        showAlert(`Band added successfully`)
        getBands()
        setName('')
        setImage('')
      }
      else {
        showAlert(`Band Couldnot added`)
        setName('')
        setImage('')
      }
      setName('')
      setImage('')
    }
  }
  async function addBand(name, image) {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'admin/addband'
      const formData = new FormData();
      formData.append('name', name);
      formData.append('myfile', image);
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      return response.data
    }
    catch (err) {
      console.log(err)
      showAlert('Something went wrong, try again')
    }
  }
  const getBands = async (e) => {
    try {
      const searchingName = searchName == undefined ? undefined : searchName
      const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'admin/getband/' + searchingName;
      const result = await axios.get(url, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: true
      })
      console.log(result.data)
      if (result.data.length === 0) {
        showAlert('No color found')
      }
      else {
        setBands(result.data)
      }
    }
    catch (err) {
      console.log(err)
      showAlert("Something went wrong, please try again letter")
    }
  };
  const handleUpdate = (id) => {
    router.push(`./updatecolor?id=${id}`)
  }
  const handleDelete = async (id) => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'admin/deleteband/' + id
      const result = await axios.delete(url, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: true
      })
      showAlert(result.data)
      getBands()
    }
    catch (err) {
      showAlert('Couldnot perform delete operations, try again')
    }
  }
  useEffect(() => {
    getBands();
  }, [searchName]);
  return (
    <>
      <Title page="Band List"></Title>
      <AdminLayout>
        <div>
          <h6 className="text-xl font-semibold dark:text-white">Band Corner</h6>
          <hr className="h-px bg-gray-200 border-1 dark:bg-gray-700" />
          <div>
            <h6 className="text-md font-semibold text-center py-4">Add Band</h6>
            <form onSubmit={handleAdd}>
              <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div class="w-full">
                  <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                  <input type="text" name="name" id="brand" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required onChange={handleChangeName} value={name} />
                  <span class="font-medium">
                    {nameError && <p class="pb-2 mt-0.5 text-xs text-red-600 dark:text-red-400">{nameError}</p>}
                  </span>
                </div>
                <div class="w-full">
                  <label for="colorImage" class="block text-sm font-medium text-gray-900 dark:text-white">Color Image</label>
                  <div class="flex items-center py-1.5">
                    <input type="file" name="myfile" onChange={handleChangeImage} />                 </div>
                </div>
              </div>
              <div className="md:col-span-2 py-4 flex justify-center">
                <button type="submit"
                  className="my-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Add Band
                </button>
              </div>
            </form>
          </div>
          <hr className="h-px bg-gray-200 border-1 dark:bg-gray-700" />
          <div>
            <div className="flex py-2 flex-col items-center space-y-4 md:flex-row md:justify-between md:items-center">
              <h6 className="text-md text-center font-semibold px-2 py-4">Band List :</h6>
              <div className="w-full md:w-1/2">
                <label htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                      fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>
                  <input type="text" className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter color name" required onKeyUp={handleChangeSearchName} />
                </div>
              </div>
            </div>
            {Array.isArray(bands) ? (
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
                        Logo
                      </th>
                      <th scope="col" class="px-6 py-3 text-center">
                        Updated By
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  {bands.map((item, index) => (
                    <tbody>
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="px-6 py-4 text-center">
                          {index + 1}
                        </td>
                        <td class="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {item.name}
                        </td>
                        <td class="px-6 py-4">
                          <img className="item-center" type="color" src={item.image} width={80} height={25}/>
                        </td>
                        {
                          !item.login ? null : (<td class="px-6 py-4 text-center">
                            {item.login.name}
                          </td>)
                        }

                        <td class="px-6 py-4  flex space-x-2 items-center">

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
              <div>No colors created yet</div>
            )
            }
          </div>
        </div>
      </AdminLayout>
    </>
  )
}