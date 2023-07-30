import dynamic from "next/dynamic"
const AdminLayout = dynamic(()=>import("../../components/dashboards/admin/adminlayout"))
const Title = dynamic(()=>import("../../components/title"))

export default function AdminDashboard() {
  return (
    <>
      <Title page="Admin Dashboard"></Title>
      <AdminLayout>
        <div>
          <h3>Welcome Admin</h3>
          <h3>This is Admin Dashboard</h3>
        </div>
      </AdminLayout>
    </>
  )
}