import dynamic from "next/dynamic"
const AdminLayout = dynamic(()=>import("../../../components/dashboards/admin/adminlayout"))
const Title = dynamic(()=>import("../../../components/title"))

export default function CustomerList() {
  return (
    <>
      <Title page="Customer List"></Title>
      <AdminLayout>
        <div>
          <h3>Customer List</h3>
        </div>
      </AdminLayout>
    </>
  )
}