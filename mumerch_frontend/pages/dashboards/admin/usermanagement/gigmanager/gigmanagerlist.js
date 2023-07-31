import dynamic from "next/dynamic"
const AdminLayout = dynamic(()=>import("../../../../components/dashboards/admin/adminlayout"))
const Title = dynamic(()=>import("../../../../components/title"))

export default function GigManagerList() {
  return (
    <>
      <Title page="Gig Manager List"></Title>
      <AdminLayout>
        <div>
          <h3>Gig Manager List</h3>
        </div>
      </AdminLayout>
    </>
  )
}