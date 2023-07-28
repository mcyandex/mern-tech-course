import Footer from "./footer";
import Header from "./header";
import Navigation from "./navigation";

export default function Layout({ children }) {
  return (
    <>
      <body>
        <Header></Header>
        <Navigation></Navigation>
        {children}
        <Footer></Footer>
      </body>
    </>
  )
}