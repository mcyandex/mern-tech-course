import dynamic from "next/dynamic"
const BandManagerLayout = dynamic(()=>import("../../../components/dashboards/bandmanager/bandmanagerlayout"))
const Title = dynamic(()=>import("../../../components/title"))

export default function CustomerList() {
  return (
    <>
      <Title page="Customer List"></Title>
      <BandManagerLayout>
        <div>
          <h3>Customer List</h3>
        </div>
      </BandManagerLayout>
    </>
  )
}