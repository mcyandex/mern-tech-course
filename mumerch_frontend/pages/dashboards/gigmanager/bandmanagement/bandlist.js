import dynamic from "next/dynamic"
const GigManagerLayout = dynamic(()=>import("../../../components/dashboards/gigmanager/gigmanagerlayout"))
const Title = dynamic(()=>import("../../../components/title"))

export default function BandList() {
  return (
    <>
      <Title page="Band List"></Title>
      <GigManagerLayout>
        <div>
          <h3>Band List</h3>
        </div>
      </GigManagerLayout>
    </>
  )
}