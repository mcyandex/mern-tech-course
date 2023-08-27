import dynamic from "next/dynamic"
const GigManagerLayout = dynamic(()=>import("../../../components/dashboards/gigmanager/gigmanagerlayout"))
const Title = dynamic(()=>import("../../../components/title"))

export default function BarChart() {
  return (
    <>
      <Title page="Bar Chart"></Title>
      <GigManagerLayout>
        <div>
          <h3>Bar Chart</h3>
        </div>
      </GigManagerLayout>
    </>
  )
}