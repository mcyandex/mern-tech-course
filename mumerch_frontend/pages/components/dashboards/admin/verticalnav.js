import Link from "next/link";

export default function VerticalNav() {
  return (
    <>
      <nav>
        <ul>
          <li>User Management
            <ul>
              <li><Link href='/dashboards/admin/usermanagement/admin/adminlist'>Admin</Link></li>
              <li><Link href='/dashboards/admin/usermanagement/employee/employeelist'>Employee</Link></li>
              <li><Link href='/dashboards/admin/usermanagement/bandmanager/bandmanagerlist'>Band Manager</Link></li>
              <li><Link href='/dashboards/admin/usermanagement/gigmanager/gigmanagerlist'>Gig Manager</Link></li>
            </ul>
          </li>
          <li>Product Management
            <ul>
              <li><Link href='/dashboards/admin/productmanagement/category/categorylist'>Category</Link></li>
              <li><Link href='/dashboards/admin/productmanagement/size/sizelist'>Size</Link></li>
              <li><Link href='/dashboards/admin/productmanagement/color/colorlist'>Color</Link></li>
              <li><Link href='/dashboards/admin/productmanagement/product/productlist'>Product</Link></li>
            </ul>
          </li>
          <li><Link href='/dashboards/admin/bandmanagement/bandlist'>Band Management</Link></li>
          <li><Link href='/dashboards/admin/gigmanagement/giglist'>Gig Management</Link></li>
          <li><Link href='/dashboards/admin/ordermanagement/orderlist'>Order Management</Link></li>
          <li><Link href='/dashboards/admin/customermanagement/customerlist'>Customer Management</Link></li>
          <li>Reports
            <ul>
              <li><Link href='/dashboards/admin/reports/salesreport'>Sales Report</Link></li>
              <li><Link href='/dashboards/admin/reports/revenuereport'>Monthly Revenue Report</Link></li>
              <li><Link href='/dashboards/admin/reports/barchart'>Bar Charts</Link></li>
            </ul>
          </li>
        </ul>
      </nav>
    </>
  )
}