import Link from "next/link";

export default function VerticalNav() {
  return (
    <>
      <nav>
        <ul>
          <li>Product Management
            <ul>
              <li><Link href='/dashboards/employee/productmanagement/category/categorylist'>Category</Link></li>
              <li><Link href='/dashboards/employee/productmanagement/size/sizelist'>Size</Link></li>
              <li><Link href='/dashboards/employee/productmanagement/color/colorlist'>Color</Link></li>
              <li><Link href='/dashboards/employee/productmanagement/product/productlist'>Product</Link></li>
            </ul>
          </li>
          <li><Link href='/dashboards/employee/bandmanagement/bandlist'>Band Management</Link></li>
          <li><Link href='/dashboards/employee/gigmanagement/giglist'>Gig Management</Link></li>
          <li><Link href='/dashboards/employee/ordermanagement/orderlist'>Order Management</Link></li>
          <li><Link href='/dashboards/employee/customermanagement/customerlist'>Customer Management</Link></li>
          <li>Reports
            <ul>
              <li><Link href='/dashboards/employee/reports/salesreport'>Sales Report</Link></li>
              <li><Link href='/dashboards/employee/reports/revenuereport'>Monthly Revenue Report</Link></li>
              <li><Link href='/dashboards/employee/reports/barchart'>Bar Charts</Link></li>
            </ul>
          </li>
        </ul>
      </nav>
    </>
  )
}