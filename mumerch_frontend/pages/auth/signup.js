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
            <label>Name</label>
            <input name="name" type="text" placeholder="Enter Name" required/>
            <br />
            <input name="email" type="text" placeholder="Enter Email" required/>
            <br />
            <input name="phone" type="text" placeholder="Enter Phone" required/>
            <br />
            <input name="password" type="password" placeholder="Enter Password" required/>
            <br />
            <input name="gig" type="text" placeholder="Enter Event Name" required/>
            <br />
            Start Date: <input name="startDate" type="date" required/>
            <br />
            End Date: <input name="endDate" type="date" required/>
            <br />
            <input name="repassword" type="password" placeholder="Retype Password" required/>
            <br />
            <input type="submit" />
          </form>
          <Link href="login">Already have an account, sign-in</Link>
        </div>
      </Layout>
    </>
  )
}