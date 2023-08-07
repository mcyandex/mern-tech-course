import Image from "next/image"
import dynamic from "next/dynamic"
const EmployeeLayout = dynamic(() => import("../../../components/dashboards/employee/employeelayout"))
const Title = dynamic(() => import("../../../components/title"))

export default function UserProfile() {
  return (
    <>
      <Title page="User Profile"></Title>
      <EmployeeLayout>
        <div>
          <h3>User Profile</h3>
          <table border={1}>
            <tbody>
              <tr>
                <td>Image</td>
                <td><Image
                  src="/aboutUs/sadia.jpg"
                  alt="image of user"
                  width={100}
                  height={120}
                /></td>
              </tr>
              <tr>
                <td>Name</td>
                <td>Sadia Afrin</td>
              </tr>
              <tr>
                <td>Phone Number</td>
                <td>0178888888</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>afrin.sadia7788@gmail.com</td>
              </tr>
            </tbody>
          </table>
        </div>
      </EmployeeLayout>
    </>
  )
}