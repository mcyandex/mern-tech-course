import dynamic from "next/dynamic";
const Footer = dynamic(()=>import("./footer"));
const Navigation = dynamic(()=>import("./navigation"));

export default function Layout({children}){
  return(
    <>
      <Navigation></Navigation>
      {children}
      <Footer></Footer>
    </>
  )
}