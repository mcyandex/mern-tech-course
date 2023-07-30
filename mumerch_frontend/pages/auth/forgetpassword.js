import Link from "next/link";
import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../components/homepage/layout"))
const Title = dynamic(() => import("../components/title"))

export default function ForgerPassword() {
  return (
    <>
      <Title page='Forget Password'></Title>
      <Layout>
        <div>
          <h3>Forget Password</h3>
          <form method="post" action='/'>
            <input name="token" type="text" placeholder="Enter Code" />
            <br />
            <input name="password" type="password" placeholder="Enter new password" />
            <br />
            <input type="submit" />
          </form>
          <div>
            <Link href="forgetpassword">Resend Code</Link>
          </div>
        </div>
      </Layout>
    </>
  )
}