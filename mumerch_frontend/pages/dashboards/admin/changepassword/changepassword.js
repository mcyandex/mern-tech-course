import dynamic from "next/dynamic"
const AdminLayout = dynamic(()=>import("../../../components/dashboards/admin/adminlayout"))
const Title = dynamic(()=>import("../../../components/title"))

export default function ChangePassword() {
  return (
    <>
      <Title page="Change Password"></Title>
      <AdminLayout>
        <div>
          <h3>Change Password</h3>
        </div>
      </AdminLayout>
    </>
  )
}