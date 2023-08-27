import dynamic from "next/dynamic"
const GigManagerLayout = dynamic(()=>import("../../../components/dashboards/gigmanager/gigmanagerlayout"))
const Title = dynamic(()=>import("../../../components/title"))

export default function CustomerList() {
  return (
    <>
      <Title page="Customer List"></Title>
      <GigManagerLayout>
        <div>
          <h3>Customer List</h3>
        </div>
      </GigManagerLayout>
    </>
  )
}