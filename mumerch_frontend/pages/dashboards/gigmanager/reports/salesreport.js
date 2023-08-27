import dynamic from "next/dynamic"
const GigManagerLayout = dynamic(()=>import("../../../components/dashboards/gigmanager/gigmanagerlayout"))
const Title = dynamic(()=>import("../../../components/title"))

export default function SalesReport() {
  return (
    <>
      <Title page="Sales Report"></Title>
      <GigManagerLayout>
        <div>
          <h3>Sales Report</h3>
        </div>
      </GigManagerLayout>
    </>
  )
}