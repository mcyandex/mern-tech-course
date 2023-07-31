import dynamic from "next/dynamic"
const AdminLayout = dynamic(()=>import("../../../components/dashboards/admin/adminlayout"))
const Title = dynamic(()=>import("../../../components/title"))

export default function BarChart() {
  return (
    <>
      <Title page="Bar Chart"></Title>
      <AdminLayout>
        <div>
          <h3>Bar Chart</h3>
        </div>
      </AdminLayout>
    </>
  )
}