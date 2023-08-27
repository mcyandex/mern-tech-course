import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import axios from "axios"
import { useEffect, useState } from "react"
const EmployeeLayout = dynamic(() => import("../../../components/dashboards/employee/employeelayout"))
const Title = dynamic(() => import("../../../components/title"))

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const uid = router.query.uid
  async function getUserProfile() {
    const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'employee/getuserprofile/' + uid
    const responce = await axios.get(url, {
      withCredentials: true
    })
    if (responce != null) {
      setUserProfile(responce.data)
    }
    else {
      setError('No profile found')
    }
  }
  useEffect(() => {
    getUserProfile()
  }, [])
  return (
    !userProfile ? (
      <>
        <span>{error && <p>{error}</p>}</span>
      </>
    ) : (
      <>
        <Title page="User Profile"></Title>
        <EmployeeLayout>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/2 p-4 flex flex-col items-center justify-center">
              <div className="w-40 h-40 rounded-full bg-blue-500 flex items-center justify-center">
                <img src={userProfile.image} alt="image of user" className="w-36 h-36 rounded-full" />
              </div>
              <input type="file" accept="image/*" />
              <div className="mt-2 w-full">
                <h5 className="text-lg font-semibold">Personal Information</h5>
                <label className="block">
                  Name
                  <input className="border rounded w-full py-1 px-2 mt-1" type="text" value={userProfile.login.name} />
                </label>
                <label className="block">
                  Father's Name
                  <input className="border rounded w-full py-1 px-2 mt-1" type="text" value={userProfile.fatherName} />
                </label>
                <label classN="block">
                  Mother's Name
                  <input className="border rounded w-full py-1 px-2 mt-1" type="text" value={userProfile.motherName} />
                </label>
                <label className="block">
                  Date of Birth
                  <input className="border rounded w-full py-1 px-2 mt-1" type="text" value={new Date(userProfile.dateOfBirth).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })} readOnly />
                </label>
              </div>
            </div>
            <div className="w-full md:w-1/2 p-4">
              <h5 className="text-lg font-semibold">Accounts Information</h5>
              <label className="block">
                ID
                <input className="border rounded w-full py-1 px-2 mt-1" type="text" value={userProfile.login.id} readOnly />
              </label>
              <label className="block">
                Designation
                <input className="border rounded w-full py-1 px-2 mt-1" type="text" value={userProfile.login.designation.name} readOnly />
              </label>
              <label className="block">
                Email
                <input className="border rounded w-full py-1 px-2 mt-1" type="email" value={userProfile.login.email} />
              </label>
              <label className="block">
                Phone Number
                <input className="border rounded w-full py-1 px-2 mt-1" type="text" value={userProfile.login.phoneNumber} />
              </label>
              <h5 className="text-lg font-semibold mt-4">General Information</h5>
              <label className="block">
                Blood Group
                <input className="border rounded w-full py-1 px-2 mt-1" type="text" value={userProfile.bloodGroup} readOnly />
              </label>
              <label className="block">
                Address
                <input className="border rounded w-full py-1 px-2 mt-1" type="text" value={userProfile.address} readOnly />
              </label>
            </div>
          </div>
        </EmployeeLayout>
      </>
    )
  )
}