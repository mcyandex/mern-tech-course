import dynamic from "next/dynamic"
const AdminLayout = dynamic(()=>import("../../../components/dashboards/admin/adminlayout"))
const Title = dynamic(()=>import("../../../components/title"))

export default function BandList() {
  return (
    <>
      <Title page="Band List"></Title>
      <AdminLayout>
        <div>
          <h3>Band List</h3>
        </div>
      </AdminLayout>
    </>
  )
}