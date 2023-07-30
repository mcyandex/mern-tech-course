import Link from "next/link";
import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../components/homepage/layout"))
const Title = dynamic(() => import("../components/title"))

export default function Signup() {
  return (
    <>
      <Title page='Sign up'></Title>
      <Layout>
        <div>
          <h3>Sign Up</h3>
          <form method="post" action='/'>
            <input name="name" type="text" placeholder="Enter Name" />
            <br />
            <input name="email" type="text" placeholder="Enter Email" />
            <br />
            <input name="phone" type="text" placeholder="Enter Phone" />
            <br />
            <input name="password" type="password" placeholder="Enter Password" />
            <br />
            <input name="repassword" type="password" placeholder="Retype Password" />
            <br />
            <input type="submit" />
          </form>
          <Link href="login">Already have an account, sign-in</Link>
        </div>
      </Layout>
    </>
  )
}