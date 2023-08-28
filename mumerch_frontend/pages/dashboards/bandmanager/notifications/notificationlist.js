import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const BandManagerLayout = dynamic(() => import("../../../components/dashboards/bandmanager/bandmanagerlayout"));
const Title = dynamic(() => import("../../../components/title"));

export default function Notification() {
  

  return (
    
      <>
        <Title page="Notifications" />
        <BandManagerLayout>
          <div>Notifications</div>
        </BandManagerLayout>
      </>
    )
}