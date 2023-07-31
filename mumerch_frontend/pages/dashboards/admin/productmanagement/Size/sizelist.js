import dynamic from "next/dynamic"
const AdminLayout = dynamic(()=>import("../../../../components/dashboards/admin/adminlayout"))
const Title = dynamic(()=>import("../../../../components/title"))

export default function SizeList() {
  return (
    <>
      <Title page="Size List"></Title>
      <AdminLayout>
        <div>
          <h3>Size List</h3>
        </div>
      </AdminLayout>
    </>
  )
}