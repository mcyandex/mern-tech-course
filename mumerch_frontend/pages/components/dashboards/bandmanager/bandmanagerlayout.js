import dynamic from "next/dynamic"
const HorizontalNavbar = dynamic(() => import("./horizontalnav"))
const VerticalNavbar = dynamic(() => import("./verticalnav"))

export default function BandManagerLayout({ children }) {
  return (
    <>
      <div>
        <HorizontalNavbar></HorizontalNavbar>
      </div>
      <div>
        <VerticalNavbar></VerticalNavbar>
      </div>
      <div class="p-8 lg:px-14 py-4 sm:ml-64">
        {children}
      </div>
    </>
  )
}

