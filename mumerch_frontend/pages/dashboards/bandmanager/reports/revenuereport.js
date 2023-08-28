import dynamic from "next/dynamic"
const BandManagerLayout = dynamic(()=>import("../../../components/dashboards/bandmanager/bandmanagerlayout"))
const Title = dynamic(()=>import("../../../components/title"))

export default function RevenueReport() {
  return (
    <>
      <Title page="Revenue Report"></Title>
      <BandManagerLayout>
        <div>
          <h3>Revenue Report</h3>
        </div>
      </BandManagerLayout>
    </>
  )
}