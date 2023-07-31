import dynamic from "next/dynamic"
const AdminLayout = dynamic(()=>import("../../../../components/dashboards/admin/adminlayout"))
const Title = dynamic(()=>import("../../../../components/title"))

export default function AdminList() {
  return (
    <>
      <Title page="Admin List"></Title>
      <AdminLayout>
        <div>
          <h3>Admin List</h3>
        </div>
      </AdminLayout>
    </>
  )
}