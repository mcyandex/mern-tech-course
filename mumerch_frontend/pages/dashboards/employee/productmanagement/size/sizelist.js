import dynamic from "next/dynamic"
const EmployeeLayout = dynamic(()=>import("../../../../components/dashboards/employee/employeelayout"))
const Title = dynamic(()=>import("../../../../components/title"))

export default function ColorList() {
  return (
    <>
      <Title page="Size List"></Title>
      <EmployeeLayout>
        <div>
          <h3>Size List</h3>
        </div>
      </EmployeeLayout>
    </>
  )
}