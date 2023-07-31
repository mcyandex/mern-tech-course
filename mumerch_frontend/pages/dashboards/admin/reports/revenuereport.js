import dynamic from "next/dynamic"
const AdminLayout = dynamic(()=>import("../../../components/dashboards/admin/adminlayout"))
const Title = dynamic(()=>import("../../../components/title"))

export default function RevenueReport() {
  return (
    <>
      <Title page="Revenue Report"></Title>
      <AdminLayout>
        <div>
          <h3>Revenue Report</h3>
        </div>
      </AdminLayout>
    </>
  )
}