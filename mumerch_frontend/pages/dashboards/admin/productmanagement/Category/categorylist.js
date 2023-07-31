import dynamic from "next/dynamic"
const AdminLayout = dynamic(()=>import("../../../../components/dashboards/admin/adminlayout"))
const Title = dynamic(()=>import("../../../../components/title"))

export default function CategoryList() {
  return (
    <>
      <Title page="Category List"></Title>
      <AdminLayout>
        <div>
          <h3>Category List</h3>
        </div>
      </AdminLayout>
    </>
  )
}