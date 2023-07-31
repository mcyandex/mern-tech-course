import Image from "next/image";
import dynamic from "next/dynamic";
const Layout = dynamic(() => import("./components/homepage/layout"))
const Title = dynamic(() => import("./components/title"))

export default function Contact() {
  return (
    <>
      <Title page='Contact us'></Title>
      <Layout>
        <div>
          <h3>Contact Us</h3>
          <form action="/" method="post">
            <input name="id" type="text" placeholder="Enter Name" />
            <br />
            <input name="password" type="text" placeholder="Enter Phone Number" />
            <br />
            <input name="email" type="email" placeholder="Enter Email" />
            <br />
            <textarea name="comments" placeholder="Enter Comments" />
            <br />
            <input type="submit" />
          </form>
        </div>
      </Layout>
    </>
  )
}