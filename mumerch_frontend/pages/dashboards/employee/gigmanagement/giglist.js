import dynamic from "next/dynamic"
const EmployeeLayout = dynamic(()=>import("../../../components/dashboards/employee/employeelayout"))
const Title = dynamic(()=>import("../../../components/title"))

export default function GigList() {
  return (
    <>
      <Title page="Gig List"></Title>
      <EmployeeLayout>
        <div>
          <h3>Gig List</h3>
        </div>
      </EmployeeLayout>
    </>
  )
}