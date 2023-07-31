import dynamic from "next/dynamic"
const AdminLayout = dynamic(()=>import("../../../components/dashboards/admin/adminlayout"))
const Title = dynamic(()=>import("../../../components/title"))

export default function GigList() {
  return (
    <>
      <Title page="Gig List"></Title>
      <AdminLayout>
        <div>
          <h3>Gig List</h3>
        </div>
      </AdminLayout>
    </>
  )
}