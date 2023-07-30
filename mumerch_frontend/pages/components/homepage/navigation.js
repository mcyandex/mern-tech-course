import Link from "next/link";
import Image from "next/image";

export default function Navigation() {
  return (
    <>
      <nav>
        <div>
          <Link href='/'>
            <Image src='/logo/mumerch_logo.png' width={125} height={70} alt="Company Logo" />
          </Link>
        </div>
        <ul>
          <li><Link href='/'>Home</Link></li>
          <li><Link href='/about'>About Us</Link></li>
          <li><Link href='/contact'>Contact Us</Link></li>
        </ul>
        <ul>
          <li><Link href='/auth/login'>Login</Link></li>
          <li><Link href='/auth/signup'>Sign up</Link></li>
        </ul>
      </nav>
    </>
  )
}