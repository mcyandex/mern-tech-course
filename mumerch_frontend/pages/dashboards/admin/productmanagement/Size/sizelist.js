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
          <table border={1}>
            <tbody>
              <tr>
                <td>Name</td>
                <td>Measurement</td>
              </tr>
              <tr>
                <td>XL</td>
                <td>40</td>
              </tr>
              <tr>
                <td>L</td>
                <td>30</td>
              </tr>
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </>
  )
}