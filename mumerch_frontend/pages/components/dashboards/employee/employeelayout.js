import dynamic from "next/dynamic"
const HorizontalNavbar = dynamic(()=>import("../horizontalnav"))
const VerticalNavbar = dynamic(()=>import("./verticalnav"))

export default function EmployeeLayout({children}){
  return(
    <>
      <HorizontalNavbar></HorizontalNavbar>
      <VerticalNavbar></VerticalNavbar>
      {children}
    </>
  )
}