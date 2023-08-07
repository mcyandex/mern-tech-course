import dynamic from "next/dynamic"
const AdminLayout = dynamic(()=>import("../../../../components/dashboards/admin/adminlayout"))
const Title = dynamic(()=>import("../../../../components/title"))

export default function AddProduct() {
  return (
    <>
      <Title page="Add Product"></Title>
      <AdminLayout>
        <div>
          <h3>Add Product</h3>
          <form method="post" action='./productlist'>
            <input name="name" type="text" placeholder="Enter Product Name" />
            <br />
            <input name="quantity" type="number" placeholder="Enter Quantity" />
            <br />
            <input name="Price" type="number" placeholder="Enter Price" />
            <br />
            <select name="size">
              <option selected>Select Size</option>
              <option>L</option>
              <option>XL</option>
            </select>
            <br/>
            <select name="color">
              <option selected>Select Color</option>
              <option>Black</option>
              <option>White</option>
            </select>
            <br/>
            <select name="band">
              <option selected>Select Band</option>
              <option>Ashes</option>
              <option>Shironamhin</option>
            </select>
            <br/>
            <input type="submit" value="Add"/>
          </form>
        </div>
      </AdminLayout>
    </>
  )
}