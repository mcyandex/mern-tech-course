import dynamic from "next/dynamic"
const BandManagerLayout = dynamic(()=>import("../../../components/dashboards/bandmanager/bandmanagerlayout"))
const Title = dynamic(()=>import("../../../components/title"))

export default function SalesReport() {
  return (
    <>
      <Title page="Sales Report"></Title>
      <BandManagerLayout>
        <div>
          <h3>Sales Report</h3>
        </div>
      </BandManagerLayout>
    </>
  )
}