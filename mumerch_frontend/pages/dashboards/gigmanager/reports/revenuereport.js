import dynamic from "next/dynamic"
const GigManagerLayout = dynamic(()=>import("../../../components/dashboards/gigmanager/gigmanagerlayout"))
const Title = dynamic(()=>import("../../../components/title"))

export default function RevenueReport() {
  return (
    <>
      <Title page="Revenue Report"></Title>
      <GigManagerLayout>
        <div>
          <h3>Revenue Report</h3>
        </div>
      </GigManagerLayout>
    </>
  )
}