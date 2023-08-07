import dynamic from "next/dynamic"
const EmployeeLayout = dynamic(()=>import("../../../../components/dashboards/employee/employeelayout"))
const Title = dynamic(()=>import("../../../../components/title"))

export default function ColorList() {
  return (
    <>
      <Title page="Monthly Revenue Report"></Title>
      <EmployeeLayout>
        <div>
          <h3>Monthly Revenue Report</h3>
        </div>
      </EmployeeLayout>
    </>
  )
}