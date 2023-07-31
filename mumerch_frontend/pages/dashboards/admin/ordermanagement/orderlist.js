import dynamic from "next/dynamic"
const AdminLayout = dynamic(()=>import("../../../components/dashboards/admin/adminlayout"))
const Title = dynamic(()=>import("../../../components/title"))

export default function OrderList() {
  return (
    <>
      <Title page="Order List"></Title>
      <AdminLayout>
        <div>
          <h3>Order List</h3>
        </div>
      </AdminLayout>
    </>
  )
}