import dynamic from "next/dynamic"
const EmployeeLayout = dynamic(()=>import("../../../../components/dashboards/employee/employeelayout"))
const Title = dynamic(()=>import("../../../../components/title"))

export default function CategoryList() {
  return (
    <>
      <Title page="Category List"></Title>
      <EmployeeLayout>
        <div>
          <h3>Category List</h3>
        </div>
      </EmployeeLayout>
    </>
  )
}