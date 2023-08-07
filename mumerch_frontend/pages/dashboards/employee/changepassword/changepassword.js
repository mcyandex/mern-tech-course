import dynamic from "next/dynamic"
const EmployeeLayoutLayout = dynamic(()=>import("../../../components/dashboards/employee/employeelayout"))
const Title = dynamic(()=>import("../../../components/title"))

export default function ChangePassword() {
  return (
    <>
      <Title page="Change Password"></Title>
      <EmployeeLayoutLayout>
        <div>
          <h3>Change Password</h3>
        </div>
      </EmployeeLayoutLayout>
    </>
  )
}