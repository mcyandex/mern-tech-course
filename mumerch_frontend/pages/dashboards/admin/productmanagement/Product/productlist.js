import dynamic from "next/dynamic"
import Link from "next/link"
const AdminLayout = dynamic(() => import("../../../../components/dashboards/admin/adminlayout"))
const Title = dynamic(() => import("../../../../components/title"))

export default function ProductList() {
  return (
    <>
      <Title page="Product List"></Title>
      <AdminLayout>
        <div>
          <Link href="./addproduct">Add Product</Link>
          <h3>Product List</h3>
          <table border={1}>
            <tbody>
              <tr>
                <td>Name</td>
                <td>Quantity</td>
                <td>Price</td>
                <td>Size</td>
                <td>Color</td>
                <td>Band</td>
              </tr>
              <tr>
                <td>Polo T Shirt</td>
                <td>100</td>
                <td>500</td>
                <td>L</td>
                <td>Black</td>
                <td>Ashes</td>
              </tr>
              <tr>
                <td>Polo T Shirt</td>
                <td>100</td>
                <td>500</td>
                <td>XL</td>
                <td>White</td>
                <td>Ashes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </>
  )
}