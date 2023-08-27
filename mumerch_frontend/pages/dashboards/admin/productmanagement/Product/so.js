import axios from "axios"
import dynamic from "next/dynamic"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useAlert } from "../../../../utils/alertcontext"
const AdminLayout = dynamic(() => import("../../../../components/dashboards/admin/adminlayout"))
const Title = dynamic(() => import("../../../../components/title"))

export default function BandManagerList() {
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')
  const [revenuePercentage, setRevenuePercentage] = useState(0)
  const [price, setPrice] = useState(0)
  const [categoryId, setCategoryId] = useState('')
  const [productId, setProductId] = useState('')
  const [band, setBand] = useState('')
  const [bandError, setBandError] = useState('')
  const [designationError, setCategoryError] = useState('')
  const [allCategorys, setAllCategorys] = useState('')
  const [allBands, setAllBands] = useState('')
  const [allProducts, setAllProducts] = useState('')
  const [searchName, setSearchName] = useState('')
  const [users, setUsers] = useState('')
  const { showAlert } = useAlert()
  const router = useRouter()
  const [searchCategoryInput, setSearchCategoryInput] = useState('')
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [searchBandInput, setSearchBandInput] = useState('')
  const [showBandDropdown, setShowBandDropdown] = useState(false);
  const [searchProductInput, setSearchProductInput] = useState('')
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const handleChangeSearchName = (e) => {
    setSearchName(e.target.value);
  }
  const handleChangeBand = (e) => {
    setBand(e.target.value);
    setBandError('')
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
  const handleChangeRevenuePercentage = (e) => {
    const value = parseInt(e.target.value)
    setRevenuePercentage(isNaN(value) ? 0 : value);
  };
  const handleChangePrice = (e) => {
    const value = parseInt(e.target.value)
    setPrice(isNaN(value) ? 0 : value);
  };
  const handleAdd = async (e) => {
    e.preventDefault()
    if (!designation) {
      setCategoryIdError('Select a designation')
    }
    if (!band) {
      setBandError('Select a Band')
    }
    if (!name || !phone || !email || !designation || !band) {
      showAlert('Must provide name, phone, email, designation and band properly')
    }
    else {
      const result = await addUser(name, email, phone, designation, band)
      if (result != null) {
        showAlert(`User added successfully`)
        getUsers()
        setName('')
        setPrice('')
        setRevenuePercentage('')
        setCategoryId('')
        setBandError('')
      }
      else {
        showAlert(`User Couldnot added`)
        setName('')
        setPrice('')
        setRevenuePercentage('')
        setCategoryId('')
        setBandError('')
      }
      setName('')
      setPrice('')
      setRevenuePercentage('')
      setCategoryId('')
      setBandError('')
    }
  }
  async function addUser(name, email, phone, designation, band) {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'admin/addbandmanager'
      const userData = {
        name: name,
        email: email,
        phoneNumber: phone,
        designation: designation,
        bandId: band
      }
      const result = await axios.post(url, userData, {
        withCredentials: true
      });
      return result
    }
    catch (err) {
      console.log(err)
      showAlert('Something went wrong, try again')
    }
  }
  const getUsers = async (e) => {
    try {
      const searchingName = searchName == undefined ? undefined : searchName
      const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'admin/getbandmanagerbyname/' + searchingName;
      const result = await axios.get(url, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: true
      })
      setUsers(result.data)
      if (result.data.length === 0) {
        showAlert('No user found')
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
  console.log(productId, cat)
  const getAllCategoryss = async (e) => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'admin/getcategory';
      const result = await axios.get(url, {
        withCredentials: true
      })
      setAllCategorys(result.data)
    }
    catch (err) {
      console.log(err)
      setAllCategorys('')
    }
  };
  const getAllBands = async (e) => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'admin/getBandfordropdown';
      const result = await axios.get(url, {
        withCredentials: true
      })
      setAllBands(result.data)
    }
    catch (err) {
      console.log(err)
      setAllBands('')
    }
  };
  const getAllProducts = async (e) => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'admin/getallproducts';
      const result = await axios.get(url, {
        withCredentials: true
      })
      setAllProducts(result.data)
    }
    catch (err) {
      console.log(err)
      setAllProducts('')
    }
  };

  // const getMainProduct = async (e) => {
  //   try {
  //     const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'admin/getallproducts';
  //     const result = await axios.get(url, {
  //       withCredentials: true
  //     })
  //     setAllProducts(result.data)
  //   }
  //   catch (err) {
  //     console.log(err)
  //     setAllProducts('')
  //   }
  // };

  const handleUpdate = (id) => {
    router.push(`./updatebandmanager?id=${id}`)
  }
  const handleDelete = async (id) => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'admin/deletebandmanager/' + id
      const result = await axios.delete(url, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: true
      })
      showAlert(result.data)
      getUsers()
    }
    catch (err) {
      showAlert('Couldnot perform delete operations, try again')
    }
  }
  const handleSearchCategoryInput = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchCategoryInput(inputValue);
    setShowCategoryDropdown(true)
  };
  const handleSearchBandInput = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchBandInput(inputValue);
    setShowBandDropdown(true)
  };
  const handleSearchProductInput = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchProductInput(inputValue);
    setShowProductDropdown(true)
  };
  useEffect(() => {
    getUsers();
    getAllCategoryss()
    getAllBands()
    getAllProducts()
  }, [searchName]);
  return (
    <>
      <Title page="Band Manager List"></Title>
      <AdminLayout>
        <div>
          <h6 className="text-xl font-semibold dark:text-white">Band Manager Corner</h6>
          <hr className="h-px bg-gray-200 border-1 dark:bg-gray-700" />
          <div>
            <h6 className="text-md font-semibold text-center py-4">Add New Band Manager</h6>
            <form onSubmit={handleAdd}>
              <div className="relative">
                <label htmlFor="designation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name
                </label>
                <input type="text" id="designation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter designation" required onChange={handleSearchProductInput}
                  value={searchProductInput} />
                  <span className="font-medium">
                  {designationError && (
                    <p className="pb-2 mt-0.5 text-xs text-red-600 dark:text-red-400">{designationError}</p>
                  )}
                </span>
                {Array.isArray(allProducts) && (
                  <div
                    className="absolute z-10 mt-1 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg shadow-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    {allProducts.map((item) => {
                      if (showProductDropdown && item.name.toLowerCase().includes(searchProductInput)) {
                        return (
                          <div key={item.id} className="p-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600" onClick={() => {
                            setProductId(item.id);
                            setSearchProductInput(item.name);
                          }}
                          >
                            {item.name}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                )}
                <span class="font-medium">
                  {nameError && <p class="pb-2 mt-0.5 text-xs text-red-600 dark:text-red-400">{nameError}</p>}
                </span>
              </div>
              <div class="grid gap-4 py-4 sm:grid-cols-2 sm:gap-6">
                <div class="w-full">
                  <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                  <input type="number" name="email" id="brand" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter price" required onChange={handleChangePrice} value={price} min={100} max={100000} />
                </div>
                <div class="w-full">
                  <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Revenue Percentage</label>
                  <input type="number" name="phone" id="brand" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter revenue percentage" required onChange={handleChangeRevenuePercentage} value={revenuePercentage} min={1} max={50} />
                </div>
                <div className="relative">
                  <label htmlFor="designation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Category
                  </label>
                  <input type="text" id="designation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter designation" required onChange={handleSearchCategoryInput}
                    value={searchCategoryInput} />
                  {Array.isArray(allCategorys) && (
                    <div
                      className="absolute z-10 mt-1 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg shadow-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      {allCategorys.map((item) => {
                        if (showCategoryDropdown && item.name.toLowerCase().includes(searchCategoryInput)) {
                          return (
                            <div key={item.id} className="p-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600" onClick={() => {
                              setCategoryId(item.id);
                              setSearchCategoryInput(item.name);
                            }}
                            >
                              {item.name}
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  )}
                  <span className="font-medium">
                    {designationError && (
                      <p className="pb-2 mt-0.5 text-xs text-red-600 dark:text-red-400">{designationError}</p>
                    )}
                  </span>
                </div>
                <div className="relative">
                  <label htmlFor="designation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Product
                  </label>
                  <input type="text" id="designation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter designation" required onChange={handleSearchProductInput}
                    value={searchBandInput} />
                  {Array.isArray(allBands) && (
                    <div
                      className="absolute z-10 mt-1 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg shadow-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      {allBands.map((item) => {
                        if (showBandDropdown && item.name.toLowerCase().includes(searchBandInput)) {
                          return (
                            <div key={item.id} className="p-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600" onClick={() => {
                              setBand(item.id);
                              setSearchBandInput(item.name);
                            }}
                            >
                              {item.name}
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  )}
                  <span className="font-medium">
                    {designationError && (
                      <p className="pb-2 mt-0.5 text-xs text-red-600 dark:text-red-400">{designationError}</p>
                    )}
                  </span>
                </div>
              </div>
              <div className="md:col-span-2 py-4 flex justify-center">
                <button type="submit"
                  className="my-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    </>
  )
}