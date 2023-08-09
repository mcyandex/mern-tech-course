import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function HorizontalNav(props) {
  const router = useRouter()
  const uname = router.query.username
  const uid = router.query.uid
  return (
    <>
      <nav>
        <div>
          <Link href='/dashboards/admin/admindashboard'>
            <Image src='/logo/mumerch_logo.png' width={125} height={70} alt="Company Logo" />
          </Link>
        </div>
        <ul>
          <li><Link href={`/dashboards/admin/userprofile/userprofile?uid=${uid}`}>Welcome, {uname}</Link></li>
          <li>
            <Link href='/dashboards/admin/notifications/notificationlist'>
              <Image src='/icons/notifications.png' width={30} height={30} alt="Notifications" />
            </Link>
          </li>
          <li>
            <Link href='/dashboards/admin/changepassword/changepassword'>
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