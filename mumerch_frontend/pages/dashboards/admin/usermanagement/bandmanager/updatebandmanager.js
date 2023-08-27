import axios from "axios";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const Title = dynamic(() => import("../../../../components/title"));
const AdminLayout = dynamic(() => import("../../../../components/dashboards/admin/adminlayout"))

export default function UpdateBandManager() {
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [designation, setDesignation] = useState('')
  const [band, setBand] = useState('')
  const [designationError, setDesignationError] = useState('')
  const [bandError, setBandError] = useState('')
  const [allDesignation, setAllDesignation] = useState('')
  const [allBands, setAllBands] = useState('')
  const [user, setUser] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const id = router.query.id;

  const handleChangeDesignation = (e) => {
    setDesignation(e.target.value);
    setDesignationError('')
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
  const handleChangeEmail = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);
    setEmailError('');

    if (!checkEmail(inputValue)) {
      setEmailError('Incorrect email format');
    }
  };
  const handleChangePhone = (e) => {
    const inputValue = e.target.value;
    setPhone(inputValue);
    setPhoneError('');

    if (!checkPhone(inputValue)) {
      setPhoneError('Incorrect phone number format');
    }
  };

  function checkPhone(data) {
    if (/^01[3-9]\d{8}$/.test(data)) {
      return true
    }
    else {
      return false
    }
  }
  function checkEmail(data) {
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data)) {
      return true
    }
    else {
      return false
    }
  }

  const getUserById = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'admin/getbandmanager/' + id;
      const response = await axios.get(url, {
        withCredentials: true
      });
      if (response.data != null) {
        setUser(response.data);
        console.log(user)
      }
    } catch (err) {
      console.log(err);
      router.push('./bandmanagerlist');
    }
  }
  const getAllDesignations = async (e) => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'admin/getalldesignations';
      const result = await axios.get(url, {
        withCredentials: true
      })
      setAllDesignation(result.data)
    }
    catch (err) {
      console.log(err)
      showAlert("Something went wrong, please try again letter")
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

  const handleEdit = async (e) => {
    e.preventDefault()
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'admin/updateuser/' + user.bandManager.id
      const loginData = {
        name: (!name ? user.bandManager.name : name),
        phoneNumber: (!phone ? user.bandManager.phoneNumber : phone),
        email: (!email ? user.bandManager.email : email),
        designation: (!designation ? user.bandManager.designation : designation),
      }
      console.log(loginData)
      const responce = await axios.put(url, loginData, {
        withCredentials: true
      });
      if (responce.data != null) {
        const data = {
          bandManager:responce.data,
          band: !band ? user.band.id : band
        }
        const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'admin/updatebandmanager/' + id
        const res = await axios.put(url, data, {
          withCredentials: true
        });
        if(res.data!=null){
          router.push(`${res.data.id}`)
        }
      }
      else {
        setError('Something went wrong')
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (!id) {
      router.push('./bandmanagerlist');
    } else {
      getUserById();
      getAllDesignations();
      getAllBands()
    }
  }, []);

  return (
    <>
      <Title page={'Update Band Manager Details'}></Title>
      <AdminLayout>
        <section class="bg-white dark:bg-gray-900">
          <div class="py-4 px-4 mx-auto">
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Update BandManager Details
              </h3>
              <Link href={'./bandmanagerlist'} type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="updateProductModal">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
                <span class="sr-only">Close</span>
              </Link>
            </div>
            <form onSubmit={handleEdit}>
              <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                {user.bandManager && user.bandManager.designation && user.band && (
                  <>
                    <div class="sm:col-span-2">
                      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                      <input type="text" name="name" id="name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={user.bandManager.name} value={name} onChange={handleChangeName} />
                      <span class="font-medium">
                        {nameError && <p class="pb-2 mt-0.5 text-xs text-red-600 dark:text-red-400">{nameError}</p>}
                      </span>
                    </div>
                    <div class="sm:col-span-2">
                      <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                      <input type="email" name="email" id="brand"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={user.bandManager.email} onChange={handleChangeEmail} value={email} />
                      <span class="font-medium">
                        {emailError && <p class="pb-2 mt-0.5 text-xs text-red-600 dark:text-red-400">{emailError}</p>}
                      </span>
                    </div>
                    <div class="sm:col-span-2">
                      <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                      <input type="text" name="phone" id="brand"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={user.bandManager.phoneNumber} onChange={handleChangePhone} value={phone} />
                      <span class="font-medium">
                        {phoneError && <p class="pb-2 mt-0.5 text-xs text-red-600 dark:text-red-400">{phoneError}</p>}
                      </span>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="category"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Designation</label>
                      <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChangeDesignation} value={!designation ? user.bandManager.designation.id : designation}>
                        <option disabled>Select Designation</option>
                        {Array.isArray(allDesignation) ? (
                          allDesignation.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))
                        ) : (
                          <option disabled>No Designation found</option>
                        )}
                      </select>
                      <span className="font-medium">
                        {designationError && <p className="pb-2 mt-0.5 text-xs text-red-600 dark:text-red-400">{designationError}
                        </p>}
                      </span>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="category"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Band</label>
                      <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChangeBand} value={!band ? user.band.id : band}>
                        <option disabled>Select Band</option>
                        {Array.isArray(allBands) ? (
                          allBands.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))
                        ) : (
                          <option disabled>No Band found</option>
                        )}
                      </select>
                      <span className="font-medium">
                        {bandError && <p className="pb-2 mt-0.5 text-xs text-red-600 dark:text-red-400">{bandError}
                        </p>}
                      </span>
                    </div>
                  </>
                )}
              </div>
              <div class="flex items-center justify-center space-x-4 py-4">
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Update Admin
                </button>
                <Link href={'./bandmanagerlist'} class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </section>
      </AdminLayout>
    </>
  )
}