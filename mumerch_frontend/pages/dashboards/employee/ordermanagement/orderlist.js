import dynamic from "next/dynamic"
const EmployeeLayout = dynamic(()=>import("../../../components/dashboards/employee/employeelayout"))
const Title = dynamic(()=>import("../../../components/title"))

export default function OrderList() {
  return (
    <>
      <Title page="Order List"></Title>
      <EmployeeLayout>
        <div>
          <h3>Order List</h3>
        </div>
      </EmployeeLayout>
    </>
  )
}