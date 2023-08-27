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
  const [proId, setProId] = useState('')
  const [price, setPrice] = useState('')
  const [revenuePercentage, setRevenuePercentage] = useState('')
  const [designation, setDesignation] = useState('')
  const [band, setBand] = useState('')
  const [category, setCategory] = useState('')
  const [color, setColor] = useState('')
  const [size, setSize] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [selectedProductDetails, setSelectedProductDetails] = useState('')

  const [searchShowNameResult, setSearchShowNameResult] = useState(false)
  const [productSelected, setProductSelected] = useState(false)

  const [dropColors, setDropColors] = useState('')
  const [dropSizes, setDropSizes] = useState('')
  const [nameError, setNameError] = useState('')
  const [priceError, setPriceError] = useState('')
  const [revenuePercentageError, setRevenuePercentageError] = useState('')
  const [bandError, setBandError] = useState('')
  const [categoryError, setCategoryError] = useState('')
  const [sizeError, setSizeError] = useState('')
  const [colorError, setColorError] = useState('')

  const [allCategorys, setAllCategorys] = useState('')
  const [allBands, setAllBands] = useState('')
  const [allColors, setAllColors] = useState('')
  const [allSizes, setAllSizes] = useState('')
  const [searchName, setSearchName] = useState('')
  const [allProducts, setAllProducts] = useState('')
  const { showAlert } = useAlert()
  const router = useRouter()

  const handleChangePrice = (e) => {
    const value = parseInt(e.target.value)
    setPrice(isNaN(value) ? 0 : value);
  }
  const handleChangeRevenuePercentage = (e) => {
    const value = parseInt(e.target.value)
    setRevenuePercentage(isNaN(value) ? 0 : value);
  }
  const handleChangeQuantity = (e) => {
    const value = parseInt(e.target.value)
    setQuantity(isNaN(value) ? 0 : value);
  }

  const handleChangeSearchName = (e) => {
    const inputValue = e.target.value;
    if (/^[A-Z][a-zA-z ]*$/.test(inputValue)) {
      setSearchName(inputValue);
      setName(inputValue)
      setSearchShowNameResult(true)
      setNameError('')
    }
    else {
      setNameError('Name should start with a capital letter')
    }
    if (inputValue == "") {
      setSearchName('')
      setName('')
      setSearchShowNameResult(false)
    }
  }
  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
    setCategoryError('')
  }
  const handleChangeBand = (e) => {
    setBand(e.target.value);
    setBandError('')
  }
  const handleChangeSize = (e) => {
    setSize(e.target.value);
    setSizeError('')
  }
  const handleChangeColor = (e) => {
    setColor(e.target.value);
    setColorError('')
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
  const handleAdd = async (e) => {
    e.preventDefault()
    if (!designation) {
      setDesignationError('Select a designation')
    }
    if (!band) {
      setBandError('Select a Band')
    }
    if (!checkEmail(email) || !checkPhone(phone)) {
      showAlert('Must provide valid email and phone number')
    }
    if (!name || !phone || !email || !designation || !band) {
      showAlert('Must provide name, phone, email, designation and band properly')
    }
    else {
      const result = await addUser(name, email, phone, designation, band)
      if (result != null) {
        showAlert(`User added successfully`)
        getAllProducts()
        setName('')
        setEmail('')
        setPhone('')
        setDesignation('')
        setBandError('')
      }
      else {
        showAlert(`User Couldnot added`)
        setName('')
        setEmail('')
        setPhone('')
        setDesignation('')
        setBandError('')
      }
      setName('')
      setEmail('')
      setPhone('')
      setDesignation('')
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
  const getAllProducts = async (e) => {
    try {
      const searchingName = searchName == undefined ? undefined : searchName
      const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'admin/getProductforaddition/' + searchingName;
      const result = await axios.get(url, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: true
      })
      if (result.data.length === 0) {
        setAllProducts('')
        setSearchShowNameResult(false)
        setProductSelected(false)
        setDropColors('')
        setDropSizes('')
      }
      else {
        setAllProducts(result.data)
      }
    }
    catch (err) {
      console.log(err)
      showAlert("Something went wrong, please try again letter")
    }
  };

  const handleNameClick = (selectedProduct) => {
    setProId(selectedProduct.id)
    setName(selectedProduct.name);
    setSearchName(selectedProduct.name);
    setPrice(selectedProduct.price);
    setRevenuePercentage(selectedProduct.revenuePercentage)
    setBand(selectedProduct.band);
    setCategory(selectedProduct.category);
    setProductSelected(true)
    setSearchShowNameResult(false)
    console.log(band, category)
  };

  const getAllCategorys = async (e) => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'admin/getallcategory';
      const result = await axios.get(url, {
        withCredentials: true
      })
      setAllCategorys(result.data)
    }
    catch (err) {
      console.log(err)
      showAlert("Something went wrong, please try again letter")
    }
  };

  const getSelectedProductDetails = async (e) => {
    try {
      if (productSelected && proId) {
        const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'admin/getProductdetails/' + proId;
        const result = await axios.get(url, {
          withCredentials: true
        })
        setSelectedProductDetails(result.data)
        if (result.data != null) {
          setDropColors(selectedProductDetails.productDetails.map(detail => detail.color))
          setDropSizes(selectedProductDetails.productDetails.map(detail => detail.size))
        }
      }
    }
    catch (err) {
      console.log(err)
    }
  };
  console.log(dropColors, dropSizes)
  const getAllSizes = async (e) => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'admin/getsizefordropdown';
      const result = await axios.get(url, {
        withCredentials: true
      })
      setAllSizes(result.data)
    }
    catch (err) {
      console.log(err)
      showAlert("Something went wrong, please try again letter")
    }
  };
  const getAllColors = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'admin/getcolorfordropdown';
      const result = await axios.get(url, {
        withCredentials: true
      });

      setAllColors(result.data);
    } catch (err) {
      console.log(err);
      showAlert("Something went wrong, please try again later");
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
      showAlert("Something went wrong, please try again letter")
    }
  };

  useEffect(() => {
    getAllProducts();
    getAllCategorys()
    getAllBands()
    getAllColors()
    getAllSizes()
    getSelectedProductDetails()
  }, [searchName]);
  return (
    <>
      <Title page="Add Product"></Title>
      <AdminLayout>
        <div>
          <h6 className="text-xl font-semibold dark:text-white">Add Product Corner</h6>
          <hr className="h-px bg-gray-200 border-1 dark:bg-gray-700" />
          <div className="py-2">
            <form onSubmit={handleAdd}>
              <div class="w-full">
                <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input type="text" name="name" id="brand" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter name" required onChange={handleChangeSearchName} value={searchName} />
                <span class="font-medium">
                  {nameError && <p class="pb-2 mt-0.5 text-xs text-red-600 dark:text-red-400">{nameError}</p>}
                </span>
                {Array.isArray(allProducts) ? (
                  <div className="w-full z-10 mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg shadow-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    {searchShowNameResult && allProducts.map((item) => (
                      <div key={item.id} className="p-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600" onClick={() => handleNameClick(item)}>
                        {item.name}
                      </div>
                    ))}
                  </div>
                ) : <></>
                }
              </div>
              <div class="grid gap-4 py-4 sm:grid-cols-2 sm:gap-6">
                <div class="w-full">
                  <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                  <input type="number" name="price" id="brand" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter price" required onChange={handleChangePrice} value={price} disabled={productSelected} min={100} max={999999} />
                  <span class="font-medium">
                    {priceError && <p class="pb-2 mt-0.5 text-xs text-red-600 dark:text-red-400">{priceError}</p>}
                  </span>
                </div>
                <div class="w-full">
                  <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Revenue Percentage</label>
                  <input type="number" name="revenuepercentage" id="brand" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter revenue percentage" required onChange={handleChangeRevenuePercentage} min={1} max={60} value={!revenuePercentage ? '' : revenuePercentage} disabled={productSelected} />
                  <span class="font-medium">
                    {revenuePercentageError && <p class="pb-2 mt-0.5 text-xs text-red-600 dark:text-red-400">{revenuePercentageError}</p>}
                  </span>
                </div>
                <div>
                  <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                  <select id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChangeCategory}>
                    <option selected="">Select Category</option>
                    {!productSelected && Array.isArray(allCategorys)
                      ? (
                        allCategorys.map((item, index) => (
                          <>
                            <option value={`${item.id}`}>{item.name}</option>
                          </>
                        ))) : (

                        category && category.name && category.id ?
                          (<>
                            <option value={category.id} selected={category.id}>{category.name}</option>
                          </>) : (<></>)

                      )
                    }
                  </select>
                  <span class="font-medium">
                    {categoryError && <p class="pb-2 mt-0.5 text-xs text-red-600 dark:text-red-400">{categoryError}</p>}
                  </span>
                </div>
                <div>
                  <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Band</label>
                  <select id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChangeBand}>
                    <option selected="">Select Band</option>
                    {!productSelected && Array.isArray(allBands)
                      ? (
                        allBands.map((item, index) => (
                          <>
                            <option value={`${item.id}`}>{item.name}</option>
                          </>
                        ))) : (
                        band && band.name && band.id ?
                          (<>
                            <option value={band.id} selected={band.id}>{band.name}</option>
                          </>) : (<></>)
                      )
                    }
                  </select>
                  <span class="font-medium">
                    {bandError && <p class="pb-2 mt-0.5 text-xs text-red-600 dark:text-red-400">{bandError}</p>}
                  </span>
                </div>
                <div>
                  <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Color</label>
                  <select id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChangeColor}>
                    <option selected="">Select Color</option>
                    {Array.isArray(allColors)
                      ? (
                        allColors.map((item, index) => (
                          <>
                            <option value={`${item.id}`}>{item.name}</option>
                          </>
                        ))) : (
                        color && color.name && color.id ?
                          (<>
                            <option value={color.id} selected={color.id}>{color.name}</option>
                          </>) : (<></>)
                      )
                    }
                  </select>
                  <span class="font-medium">
                    {bandError && <p class="pb-2 mt-0.5 text-xs text-red-600 dark:text-red-400">{bandError}</p>}
                  </span>
                </div>
                <div>
                  <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Size</label>
                  <select id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChangeSize}>
                    <option selected="">Select Size</option>
                    {Array.isArray(allSizes)
                      ? (
                        allSizes.map((item, index) => (
                          <>
                            <option value={`${item.id}`}>{item.name}</option>
                          </>
                        ))) : (
                        size && size.name && size.id ?
                          (<>
                            <option value={size.id} selected={size.id}>{size.name}</option>
                          </>) : (<></>)
                      )
                    }
                  </select>
                  <span class="font-medium">
                    {sizeError && <p class="pb-2 mt-0.5 text-xs text-red-600 dark:text-red-400">{sizeError}</p>}
                  </span>
                </div>
                <div class="w-full">
                  <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                  <input type="number" name="revenuepercentage" id="brand" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter revenue percentage" required onChange={handleChangeQuantity} min={1} max={9999999} value={!quantity ? '' : quantity} />
                  <span class="font-medium">
                    {revenuePercentageError && <p class="pb-2 mt-0.5 text-xs text-red-600 dark:text-red-400">{revenuePercentageError}</p>}
                  </span>
                </div>
              </div>
              <div className="md:col-span-2 py-4 flex justify-center">
                <button type="submit"
                  className="my-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    </>
  )
}