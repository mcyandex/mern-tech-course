import Link from "next/link";

export default function HorizontalNav() {
  return (
    <>
      <nav>
        <ul>
          <li>User Management
            <ul>
              <li><Link href='/dashboards/admin/changepassword'>Admin</Link></li>
              <li><Link href='/dashboards/admin/changepassword'>Employee</Link></li>
              <li><Link href='/dashboards/admin/changepassword'>Band Manager</Link></li>
              <li><Link href='/dashboards/admin/changepassword'>Gig Manager</Link></li>
            </ul>
          </li>
          <li>Product Management
            <ul>
              <li><Link href='/dashboards/admin/changepassword'>Category</Link></li>
              <li><Link href='/dashboards/admin/changepassword'>Size</Link></li>
              <li><Link href='/dashboards/admin/changepassword'>Color</Link></li>
              <li><Link href='/dashboards/admin/changepassword'>Product</Link></li>
            </ul>
          </li>
          <li><Link href='/dashboards/admin/changepassword'>Band Management</Link></li>
          <li><Link href='/dashboards/admin/changepassword'>Gig Management</Link></li>
          <li><Link href='/dashboards/admin/changepassword'>Order Management</Link></li>
          <li><Link href='/dashboards/admin/changepassword'>Customer Management</Link></li>
          <li>Reports
            <ul>
              <li><Link href='/dashboards/admin/changepassword'>Sales Report</Link></li>
              <li><Link href='/dashboards/admin/changepassword'>Monthly Revenue Report</Link></li>
              <li><Link href='/dashboards/admin/changepassword'>Bar Charts</Link></li>
            </ul>
          </li>
        </ul>
      </nav>
    </>
  )
}