import axios from "axios"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { useAlert } from "../../../utils/alertcontext"
const GigManagerLayout = dynamic(() => import("../../../components/dashboards/gigmanager/gigmanagerlayout"))
const Title = dynamic(() => import("../../../components/title"))



export default function GigList() {
  const { name } = useState('')
  const { startdate } = useState('')
  const { enddate } = useState('')
  const { nameError } = useState('')
  const { startdateError } = useState('')
  const { enddateError } = useState('')
  const [searchName, setSearchName] = useState('')
  const [setName, setNameError] = useState('')
  const [setStartDate, setStartDateError] = useState('')
  const [setEndDate, setEndDateError] = useState('')
  const { showAlert } = useAlert()
  const [gigs, setGigs] = useState('')
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
  const handleChangeStartDate = (e) => {
    const inputValue = e.target.value;
    if (test(inputValue)) {
      setStartDate(inputValue);
      setStartDateError('')
    }
    else {
      setStartDateError('Provide value')
    }
    if (inputValue == "") {
      setStartDate('')
    }
  }
  const handleChangeEndDate = (e) => {
    const inputValue = e.target.value;
    if (test(inputValue)) {
      setEndDate(inputValue);
      setEndDateError('')
    }
    else {
      setEndDateError('Provide value')
    }
    if (inputValue == "") {
      setEndDate('')
    }
  }
  const handleAdd = async (e) => {
    e.preventDefault()
    if (!name || !startdate || !enddate) {
      showAlert('Must provide name properly')
    }
    else {
      const result = await addGig(name, startdate, enddate)
      if (result != null) {
        showAlert(`Gig added successfully`)
        getGigs()
        setName('')
        setStartDate('')
        setEndDate('')
      }
      else {
        showAlert(`Gig Couldn't be added`)
        setName('')



      }
      setName('')
      setStartDate('')
      setEndDate('')
    }
  }
  async function addGig(name, startdate, enddate) {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'gigmanager/addGig'
      const gigData = {
        name: name,
        startdate: startdate,
        enddate: enddate,
      }
      const result = await axios.post(url, gigData, {
        withCredentials: true
      });
      return result.data
    }
    catch (err) {
      console.log(err)
      showAlert('Something went wrong, try again')
    }
  }
  const getGigs = async (e) => {
    try {
      const searchingName = searchName == undefined ? undefined : searchName
      const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'gigmanager/getgigbyname/' + searchingName;
      const result = await axios.get(url, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: true
      })
      setGigs(result.data)
      console.log(result.data)
      if (result.data.length === 0) {
        showAlert('No gig found')
      }
      else {
        return result.data
      }
    }
    catch (err) {
      console.log(err)
      showAlert("Something went wrong")
    }
  };
  useEffect(() => {
    getGigs();
  }, [searchName]);



  return (
    <>
      <Title page="Gig List"></Title>
      <GigManagerLayout>
        <div>
          <h6 className="text-xl font-semibold dark:text-white">Gig Corner</h6>
          <hr className="h-px bg-gray-200 border-1 dark:bg-gray-700" />
          <div>
            <h6 className="text-md font-semibold text-center py-4">Add Gig</h6>
            <form onSubmit={handleAdd}>
              <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div class="w-full">
                  <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                  <input type="text" name="name" id="brand" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required onChange={handleChangeName} value={name} />
                  <span className="font-medium">
                    {nameError && <p className="pb-2 mt-0.5 text-xs text-red-600 dark:text-red-400">{nameError}</p>}
                  </span>
                </div>
                <div class="w-full">
                  <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Date</label>
                  <input type="number" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Start Date" required onChange={handleChangeStartDate} value={startdate} />
                  <span className="font-medium">
                    {startdateError && <p className="pb-2 mt-0.5 text-xs text-red-600 dark:text-red-400">{startdateError}</p>}
                  </span>
                </div>
                <div class="w-full">
                  <label for="priceee" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Date</label>
                  <input type="number" name="priceee" id="priceee" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Start Date" required onChange={handleChangeEndDate} value={enddate} />
                  <span className="font-medium">
                    {enddateError && <p className="pb-2 mt-0.5 text-xs text-red-600 dark:text-red-400">{enddateError}</p>}
                  </span>
                </div>
              </div>
              <div className="md:col-span-2 py-4 flex justify-center">
                <button type="submit"
                  className="my-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Add Gig
                </button>
              </div>
            </form>
          </div>
          <hr className="h-px bg-gray-200 border-1 dark:bg-gray-700" />
          <div>
            <div className="flex py-2 flex-col items-center space-y-4 md:flex-row md:justify-between md:items-center">
              <h6 className="text-md text-center font-semibold px-2 py-4">Gig List :</h6>
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
                  <input
                    type="text"
                    className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter gig name"
                    required
                    onKeyUp={handleChangeSearchName}
                  />
                </div>
              </div>
            </div>



            {Array.isArray(gigs) ? (
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
                        Start Date
                      </th>
                      <th scope="col" class="px-6 py-3 text-center">
                        End Date
                      </th>
                    </tr>
                  </thead>
                  {gigs.map((item, index) => (
                    <tbody>
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="px-6 py-4 text-center">
                          {index + 1}
                        </td>
                        <td class="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {item.name}
                        </td>
                        <td class="px-6 py-4 text-center">
                          {item.startDate}
                        </td>
                        {
                          <td class="px-6 py-4 text-center">
                            {item.endDate}
                          </td>
                        }
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            ) : (
              <div>No gigs created yet</div>
            )
            }
          </div>
        </div>
      </GigManagerLayout>
    </>
  )
}