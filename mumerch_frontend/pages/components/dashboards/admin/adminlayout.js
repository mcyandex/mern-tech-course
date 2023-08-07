import dynamic from "next/dynamic"
const HorizontalNavbar = dynamic(()=>import("./horizontalnav"))
const VerticalNavbar = dynamic(()=>import("./verticalnav"))

export default function AdminLayout({children}, props){
  return(
    <>
      <HorizontalNavbar uid={props.uid} uname={props.uname}></HorizontalNavbar>
      <VerticalNavbar></VerticalNavbar>
      {children}
    </>
  )
}