import dynamic from "next/dynamic"
const EmployeeLayout = dynamic(()=>import("../../components/dashboards/employee/employeelayout"))
const Title = dynamic(()=>import("../../components/title"))

export default function EmployeeDashboard() {
  return (
    <>
      <Title page="Employee Dashboard"></Title>
      <EmployeeLayout>
        <div>
          <h3>Welcome Employee</h3>
          <h3>This is Employee Dashboard</h3>
        </div>
      </EmployeeLayout>
    </>
  )
}