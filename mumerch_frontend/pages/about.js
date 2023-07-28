import Image from "next/image";
import Layout from "./components/layout";
import Title from "./components/title";

export default function About() {
  return (
    <>
      <Title page='About us'></Title>
      <Layout>
        <h1>About Us</h1>
        <Image
          src="/aboutUs/elahi.jpg"
          alt="image of user"
          width={50}
          height={60}
        />
      </Layout>
    </>
  )
}