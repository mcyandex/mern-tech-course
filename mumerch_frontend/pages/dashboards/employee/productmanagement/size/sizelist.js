import axios from "axios"
import dynamic from "next/dynamic"
import { useAlert } from "../../../../utils/alertcontext"
import { useEffect, useState } from "react"
const EmployeeLayout = dynamic(()=>import("../../../../components/dashboards/employee/employeelayout"))
const Title = dynamic(()=>import("../../../../components/title"))

export default function SizeList() {
  const [searchName, setSearchName] = useState('')
  const [sizes, setSizes] = useState('')
  const {showAlert} = useAlert()
  
  const handleChangeSearchName = (e) => {
    setSearchName(e.target.value);
  }
  
  const getSizes = async (e) => {
    try {
      const searchingName = searchName == undefined ? undefined : searchName
      const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'employee/getsizebyname/' + searchingName;
      const result = await axios.get(url, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: true
      })
      setSizes(result.data)
      if (result.data.length===0) {
        showAlert('No size found')
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
  useEffect(() => {
    getSizes();
  }, [searchName]);

  function Alert({ message }) {
    const [showAlert, setShowAlert] = useState(true);

    useEffect(() => {
      const timeout = setTimeout(() => {
        setShowAlert(false);
      }, 5000);

      return () => clearTimeout(timeout);
    }, []);

    return (
      showAlert && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4">
          <div className="bg-yellow-50 dark:bg-gray-800 dark:text-yellow-400 border border-yellow-300 dark:border-yellow-700 rounded-lg p-4 shadow-md relative">
            <p>{message}</p>
            <button
              type="button"
              className="absolute top-0 right-0 -mt-2 -mr-2 p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-200 focus:ring-2 focus:ring-red-400"
              onClick={() => setShowAlert(false)}
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>
        </div>
      )
    );
  }


  return (
    <>
      <Title page="Size Corner"></Title>
      <EmployeeLayout>
      <div>
      <h6 className="text-xl font-semibold dark:text-white">Size Corner</h6>
      <div className="flex py-2 flex-col items-center space-y-4 md:flex-row md:justify-between md:items-center">
        <h6 className="text-md text-center font-semibold px-2 py-4">Size List :</h6>
        <div className="w-full md:w-1/2">
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter size name"
              required
              onKeyUp={handleChangeSearchName}
            />
          </div>
        </div>
      </div>

      {Array.isArray(sizes) ? (
        <div className="relative py-2 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  No.
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Chest Measurement (inch)
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Updated By
                </th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((item, index) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={item.id}>
                  <td className="px-6 py-4 text-center">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {item.measurement}
                  </td>
                  {!item.login ? null : (
                    <td className="px-6 py-4 text-center">
                      {item.login.name}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No sizes created yet</div>
      )}
    </div>
      </EmployeeLayout>
    </>
  )
}