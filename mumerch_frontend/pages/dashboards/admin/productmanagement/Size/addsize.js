import dynamic from "next/dynamic"
const AdminLayout = dynamic(()=>import("../../../../components/dashboards/admin/adminlayout"))
const Title = dynamic(()=>import("../../../../components/title"))

export default function AddSize() {
  return (
    <>
      <Title page="Add Size"></Title>
      <AdminLayout>
        <div>
          <h3>Add Size</h3>
          <form method="post" action='./sizelist'>
            <input name="name" type="text" placeholder="Enter Size Name" />
            <br />
            <input name="measurement" type="number" placeholder="Enter Measurement" />
            <br />
            <input type="submit" value="Add"/>
          </form>
        </div>
      </AdminLayout>
    </>
  )
}