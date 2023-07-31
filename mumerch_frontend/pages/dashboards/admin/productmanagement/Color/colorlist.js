import dynamic from "next/dynamic"
const AdminLayout = dynamic(()=>import("../../../../components/dashboards/admin/adminlayout"))
const Title = dynamic(()=>import("../../../../components/title"))

export default function ColorList() {
  return (
    <>
      <Title page="Color List"></Title>
      <AdminLayout>
        <div>
          <h3>Color List</h3>
        </div>
      </AdminLayout>
    </>
  )
}