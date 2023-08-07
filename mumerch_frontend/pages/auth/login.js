import Link from "next/link";
import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../components/homepage/layout"))
const Title = dynamic(() => import("../components/title"))

export default function Login() {
  return (
    <>
      <Title page='Login'></Title>
      <Layout>
        <div>
          <h3>Login</h3>
          <form method="post" action='/dashboards/employee/employeedashboard'>
            <input name="id" type="text" placeholder="Enter id" />
            <br />
            <input name="password" type="password" placeholder="Enter password" />
            <br />
            <Link href="forgetpassword">Forget Password</Link>
            <br />
            <input type="submit" />
          </form>
          <div>
            <Link href="signup">Don't have an account, sign-up</Link>
          </div>
        </div>
      </Layout>
    </>
  )
}