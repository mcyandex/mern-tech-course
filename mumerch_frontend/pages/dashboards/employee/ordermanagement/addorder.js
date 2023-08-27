import axios from "axios"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useAlert } from "../../../utils/alertcontext"
const EmployeeLayout = dynamic(() => import("../../../components/dashboards/employee/employeelayout"))
const Title = dynamic(() => import("../../../components/title"))

export default function AddOrder() {
  // Customer Details
  const [Name, setCustomerName] = useState('');
  const [Email, setCustomerEmail] = useState('');
  const [Phone, setCustomerPhone] = useState('');

  // Order Details
  const [productName, setProductName] = useState('');
  const [orderQuantity, setOrderQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  // Other State Variables
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);


  const [name, setName] = useState('')
  const [proId, setProId] = useState('')
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
  //const [revenuePercentageError, setRevenuePercentageError] = useState('')
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



  // Function to handle adding a customer
  const handleAddCustomer = async (e) => {
    e.preventDefault();

    if (!Name || !Email || !Phone) {
      showAlert("Please provide name, email, and phone for the customer.");
      return;
    }

    // Call your addUser function to add a customer
    const result = await addUser(Name, Email, Phone);

    if (result != null) {
      showAlert("Customer added successfully");

      setCustomerName('');
      setCustomerEmail('');
      setCustomerPhone('');
      router.push('./customerlist') //Give the list
    } else {
      showAlert("Customer could not be added");
      setCustomerName('');
      setCustomerEmail('');
      setCustomerPhone('');
    }
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
  };
  async function addUser(Name, Email, Phone) {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'employee/addcustomer'
      const userData = {
        name: Name,
        email: Email,
        phoneNo: Phone
      }
      const result = await axios.post(url, userData, {
        withCredentials: true
      });
      return result.data
    }
    catch (err) {
      //console.log(err)
      showAlert('Something went wrong, try again')
    }
  }

  // Function to handle adding an order
  const handleAddOrder = async (e) => {
    e.preventDefault();

    if (!selectedCustomerId) {
      showAlert("Please select a customer.");
      return;
    }

    if (!productName || orderQuantity <= 0) {
      showAlert("Please provide a product name and a valid order quantity.");
      return;
    }


    // Call your addOrder function to add an order for the selected customer
    const result = await addOrder(selectedCustomerId, productName, orderQuantity);

    if (result != null) {
      showAlert("Order added successfully");
      setProductName('');
      setOrderQuantity(0);
      getAllOrders(selectedCustomerId);
    } else {
      showAlert("Order could not be added");
    }
  };

  // Function to delete an order
  const handleDeleteOrder = async (orderId) => {
    // Call your deleteOrder function to delete the order
    const result = await deleteOrder(orderId);

    if (result != null) {
      showAlert("Order deleted successfully");
      // Refresh order list for the selected customer
      getAllOrders(selectedCustomerId);
    } else {
      showAlert("Order could not be deleted");
    }
  };

  // Function to update an order
  const handleUpdateOrder = async (orderId, updatedQuantity) => {
    // Call your updateOrder function to update the order
    const result = await updateOrder(orderId, updatedQuantity);

    if (result != null) {
      showAlert("Order updated successfully");
      // Refresh order list for the selected customer
      getAllOrders(selectedCustomerId);
    } else {
      showAlert("Order could not be updated");
    }
  };

  const handleChangePrice = (e) => {
    const value = parseInt(e.target.value)
    setPrice(isNaN(value) ? 0 : value);
  }
  // const handleChangeRevenuePercentage = (e) => {
  //   const value = parseInt(e.target.value)
  //   setRevenuePercentage(isNaN(value) ? 0 : value);
  // }
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
    if (!band) {
      setBandError('Select a Band')
    }
    if (!checkEmail(email) || !checkPhone(phone)) {
      showAlert('Must provide valid email and phone number')
    }
    if (!name || !phone || !email || !band) {
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
  // async function addUser(name, email, phone, designation, band) {
  //   try {
  //     const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'employee/addcustomer'
  //     const userData = {
  //       name: name,
  //       email: email,
  //       phoneNumber: phone,
  //       designation: designation,
  //       bandId: band
  //     }
  //     const result = await axios.post(url, userData, {
  //       withCredentials: true
  //     });
  //     return result.data
  //   }
  //   catch (err) {
  //     console.log(err)
  //     showAlert('Something went wrong, try again')
  //   }
  // }
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
      <Title page="Customer and Order Manager"></Title>
      <EmployeeLayout>
        <div>
          <h6 className="text-xl font-semibold dark:text-white">Customer Corner</h6>
          <hr className="h-px bg-gray-200 border-1 dark:bg-gray-700" />
          {/* Customer Form */}
          <div className="py-2">
            <form onSubmit={handleAddCustomer}>
              {/* Customer Input Fields */}
              <div className="grid gap-4 py-4 sm:grid-cols-2 sm:gap-6">
                <div className="w-full">
                  <label htmlFor="Name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Customer Name</label>
                  <input
                    type="text"
                    id="Name"
                    name="Name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter customer name"
                    required
                    value={Name}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="Email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Customer Email</label>
                  <input
                    type="email"
                    id="Email"
                    name="Email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter customer email"
                    required
                    value={Email}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="Phoone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Customer Phone</label>
                  <input
                    type="number"
                    id="Phone"
                    name="customerPhone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter customer email"
                    required
                    value={Phone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                  />
                </div>
              </div>
              {/* Add Customer Button */}
              <div className="md:col-span-2 py-4 flex justify-center">
                <button
                  type="submit"
                  className="my-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add Customer
                </button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <h6 className="text-xl font-semibold dark:text-white">Order Corner</h6>
          <hr className="h-px bg-gray-200 border-1 dark:bg-gray-700" />
          {/* Order Form */}
          <div className="py-2">
            <form onSubmit={handleAddOrder}>
              {/* Select Customer */}
              <div className="w-full">
                <label htmlFor="selectCustomer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Customer</label>
                <select
                  id="selectCustomer"
                  name="selectCustomer"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setSelectedCustomerId(e.target.value)}
                  required
                >
                  <option value="" disabled>Select a customer</option>
                  {/* Map through customers and create options */}
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Order Input Fields */}
              <div className="grid gap-4 py-4 sm:grid-cols-2 sm:gap-6">
                <div className="w-full">
                  <label htmlFor="productName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter product name"
                    required
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="orderQuantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Order Quantity</label>
                  <input
                    type="number"
                    id="orderQuantity"
                    name="orderQuantity"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter order quantity"
                    required
                    value={orderQuantity}
                    onChange={(e) => setOrderQuantity(parseInt(e.target.value))}
                    min={1}
                  />
                </div>
              </div>
              {/* Add Order Button */}
              <div className="md:col-span-2 py-4 flex justify-center">
                <button
                  type="submit"
                  className="my-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add Order
                </button>
              </div>
            </form>
          </div>

          <div className="py-4">
            <h6 className="text-lg font-semibold dark:text-white">Order List</h6>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {/* Replace this with actual order list rendering */}
              {orders.map((order) => (
                <li key={order.id} className="py-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-800 dark:text-gray-300">Product: {order.productName}</span>
                    <span className="text-gray-500 dark:text-gray-400">Quantity: {order.orderQuantity}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </EmployeeLayout>
    </>
  );

}