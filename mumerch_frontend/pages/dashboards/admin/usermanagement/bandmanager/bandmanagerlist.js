import dynamic from "next/dynamic"
const AdminLayout = dynamic(()=>import("../../../../components/dashboards/admin/adminlayout"))
const Title = dynamic(()=>import("../../../../components/title"))

export default function BandManagerList() {
  return (
    <>
      <Title page="Band Manager List"></Title>
      <AdminLayout>
        <div>
          <h3>Band Manager List</h3>
        </div>
      </AdminLayout>
    </>
  )
}