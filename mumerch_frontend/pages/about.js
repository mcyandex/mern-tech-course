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
          <h3>About Us</h3>
          <table border={1}>
            <tbody>
              <tr>
                <td colSpan='3'>Developer Team</td>
              </tr>
              <tr>
                <td>Name</td>
                <td>ID</td>
                <td>Image</td>
              </tr>
              <tr>
                <td>AL SHAKIB E ELAHI</td>
                <td>20-43665-2</td>
                <td><Image
                  src="/aboutUs/elahi.jpg"
                  alt="image of user"
                  width={100}
                  height={120}
                /></td>
              </tr>
              <tr>
                <td>Meem</td>
                <td>**-*****-**</td>
                <td>Image</td>
              </tr>
              <tr>
                <td>Sadia</td>
                <td>**-*****-**</td>
                <td>Image</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  )
}