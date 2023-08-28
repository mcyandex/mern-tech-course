import axios from "axios"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { useAlert } from "../../../utils/alertcontext"
const BandManagerLayout = dynamic(()=>import("../../../components/dashboards/bandmanager/bandmanagerlayout"))
const Title = dynamic(()=>import("../../../components/title"))

export default function GigList() {
  const [searchName, setSearchName] = useState('')
  const { showAlert } = useAlert()
  const [gigs, setGigs] = useState('')
  const handleChangeSearchName = (e) => {
    setSearchName(e.target.value);
  }


  const getGigs = async (e) => {
    try {
      const searchingName = searchName == undefined ? undefined : searchName
      const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'bandmanager/getgigbyname/' + searchingName;
      const result = await axios.get(url, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: true
      })
      setGigs(result.data)
      console.log(result.data)
      if (result.data.length===0) {
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
      <BandManagerLayout>
      <div>
          <h6 className="text-xl font-semibold dark:text-white">Gig Corner</h6>
          <hr className="h-px bg-gray-200 border-1 dark:bg-gray-700" />
          <div>
 
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
      </BandManagerLayout>
    </>
  )
}