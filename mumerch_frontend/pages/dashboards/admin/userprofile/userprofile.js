import Image from "next/image"
import dynamic from "next/dynamic"
const AdminLayout = dynamic(() => import("../../../components/dashboards/admin/adminlayout"))
const Title = dynamic(() => import("../../../components/title"))

export default function UserProfile() {
  return (
    <>
      <Title page="User Profile"></Title>
      <AdminLayout>
        <div>
          <h3>User Profile</h3>
          <table border={1}>
            <tbody>
              <tr>
                <td>Image</td>
                <td><Image
                  src="/aboutUs/elahi.jpg"
                  alt="image of user"
                  width={100}
                  height={120}
                /></td>
              </tr>
              <tr>
                <td>Name</td>
                <td>AL SHAKIB E ELAHI</td>
              </tr>
              <tr>
                <td>Phone Number</td>
                <td>01911-000000</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>alshakibeelahi@gmail.com</td>
              </tr>
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </>
  )
}