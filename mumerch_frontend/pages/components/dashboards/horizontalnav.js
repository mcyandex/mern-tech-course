import Link from "next/link";
import Image from "next/image";

export default function HorizontalNav() {
  return (
    <>
      <nav>
        <div>
          <Link href='/dashboards/employee/employeedashboard'>
            <Image src='/logo/mumerch_logo.png' width={125} height={70} alt="Company Logo" />
          </Link>
        </div>
        <ul>
          <li><Link href='/dashboards/employee/userprofile/userprofile'>Welcome, Sadia</Link></li>
          <li>
            <Link href='/dashboards/employee/notifications/notifications'>
              <Image src='/icons/notifications.png' width={30} height={30} alt="Notifications" />
            </Link>
          </li>
          <li>
            <Link href='/dashboards/employee/changepassword/changepassword'>
              <Image src='/icons/settings.png' width={30} height={30} alt="Settings" />
            </Link>
          </li>
          <li>
            <Link href='/'>
              <Image src='/icons/logout.png' width={30} height={30} alt="logout" />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}