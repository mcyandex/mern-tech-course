import Layout from "./components/layout";
import Title from "./components/title";

export default function Login() {
  return (
    <>
      <Title page='Login'></Title>
      <Layout>
        <input name="id" type="text" placeholder="Enter id" />
        <input name="password" type="text" placeholder="Enter password" />
        <input type="submit" />
      </Layout>
    </>
  )
}