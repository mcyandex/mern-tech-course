import Image from "next/image";
import dynamic from "next/dynamic";
const Layout = dynamic(() => import("./components/homepage/layout"))
const Title = dynamic(() => import("./components/title"))

export default function About() {
  return (
    <>
      <Title page='About us'></Title>
      <Layout>
        <div>
          <h1>About Us</h1>
          <Image
            src="/aboutUs/elahi.jpg"
            alt="image of user"
            width={50}
            height={60}
          />
        </div>
      </Layout>
    </>
  )
}