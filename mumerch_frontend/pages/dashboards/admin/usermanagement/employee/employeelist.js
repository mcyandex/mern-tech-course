import dynamic from "next/dynamic"
const AdminLayout = dynamic(()=>import("../../../../components/dashboards/admin/adminlayout"))
const Title = dynamic(()=>import("../../../../components/title"))

export default function EmployeeList() {
  return (
    <>
      <Title page="Employee List"></Title>
      <AdminLayout>
        <div>
          <h3>Employee List</h3>
        </div>
      </AdminLayout>
    </>
  )
}