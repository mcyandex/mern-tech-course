import dynamic from "next/dynamic"
const BandManagerLayout = dynamic(()=>import("../../../components/dashboards/bandmanager/bandmanagerlayout"))
const Title = dynamic(()=>import("../../../components/title"))

export default function OrderList() {
  return (
    <>
      <Title page="Order List"></Title>
      <BandManagerLayout>
        <div>
          <h3>Order List</h3>
        </div>
      </BandManagerLayout>
    </>
  )
}