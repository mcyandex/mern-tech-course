import Link from "next/link";

export default function Navigation(){
  return(
    <>
      <nav>
        <Link href='/'>MuMerch | </Link>
        <Link href='about'>About Us | </Link>
        <Link href='login'>Login | </Link>
      </nav>
    </>
  )
}