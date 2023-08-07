import dynamic from "next/dynamic"
const EmployeeLayout = dynamic(()=>import("../../../../components/dashboards/employee/employeelayout"))
const Title = dynamic(()=>import("../../../../components/title"))

export default function ColorList() {
  return (
    <>
      <Title page="Bar charts"></Title>
      <EmployeeLayout>
        <div>
          <h3>Bar charts</h3>
        </div>
      </EmployeeLayout>
    </>
  )
}