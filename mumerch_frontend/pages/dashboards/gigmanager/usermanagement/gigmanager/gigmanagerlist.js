import dynamic from "next/dynamic"
const GigManagerLayout = dynamic(()=>import("../../../../components/dashboards/gigmanager/gigmanagerlayout"))
const Title = dynamic(()=>import("../../../../components/title"))

export default function GigManagerList() {
  return (
    <>
      <Title page="Gig Manager List"></Title>
      <GigManagerLayout>
        <div>
          <h3>Gig Manager List</h3>
        </div>
      </GigManagerLayout>
    </>
  )
}