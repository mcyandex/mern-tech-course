import dynamic from "next/dynamic"
const AdminLayout = dynamic(()=>import("../../../components/dashboards/admin/adminlayout"))
const Title = dynamic(()=>import("../../../components/title"))

export default function NotificationList() {
  return (
    <>
      <Title page="Notification List"></Title>
      <AdminLayout>
        <div>
          <h3>Notification List</h3>
          <h3>Currently no notification available</h3>
        </div>
      </AdminLayout>
    </>
  )
}