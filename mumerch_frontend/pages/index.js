import dynamic from "next/dynamic";
const Layout = dynamic(() => import("./components/homepage/layout"))
const Title = dynamic(() => import("./components/title"))

export default function Home() {
  return (
    <>
      <Title page="A marchendise management app"></Title>
      <Layout>
        <div>
          <h3>Welcome to MuMerch</h3>
        </div>
      </Layout>
    </>
  )
}
