import dynamic from "next/dynamic"
const GigManagerLayout = dynamic(()=>import("../../../components/dashboards/gigmanager/gigmanagerlayout"))
const Title = dynamic(()=>import("../../../components/title"))

export default function OrderList() {
  return (
    <>
      <Title page="Order List"></Title>
      <GigManagerLayout>
        <div>
          <h3>Order List</h3>
        </div>
      </GigManagerLayout>
    </>
  )
}