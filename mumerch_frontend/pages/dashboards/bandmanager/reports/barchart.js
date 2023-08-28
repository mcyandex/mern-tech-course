import dynamic from "next/dynamic"
const BandManagerLayout = dynamic(()=>import("../../../components/dashboards/bandmanager/bandmanagerlayout"))
const Title = dynamic(()=>import("../../../components/title"))

export default function BarChart() {
  return (
    <>
      <Title page="Bar Chart"></Title>
      <BandManagerLayout>
        <div>
          <h3>Bar Chart</h3>
        </div>
      </BandManagerLayout>
    </>
  )
}