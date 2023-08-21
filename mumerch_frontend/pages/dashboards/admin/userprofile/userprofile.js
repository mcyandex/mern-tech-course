import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import axios from "axios"
import { useEffect, useState } from "react"
const AdminLayout = dynamic(() => import("../../../components/dashboards/admin/adminlayout"))
const Title = dynamic(() => import("../../../components/title"))

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const uid = router.query.uid
  async function getUserProfile() {
    const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'admin/getuserprofile/' + uid
    const responce = await axios.get(url,{
      withCredentials:true
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
        <AdminLayout>
          <div>
            <h1>{uid}</h1>
            <h3>User Profile</h3>
            <table border={1}>
              <tbody>
                <tr>
                  <td>Image</td>
                  <td><img
                    src={userProfile.image}
                    alt="image of user"
                    width={100}
                    height={120}
                  /></td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>{userProfile.login.name}</td>
                </tr>
                <tr>
                  <td>Phone Number</td>
                  <td>{userProfile.login.phoneNumber}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{userProfile.login.email}</td>
                </tr>
                <tr>
                  <td>Date of Birth</td>
                  <td>{new Date(userProfile.dateOfBirth).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </AdminLayout>
      </>
    )
  )
}