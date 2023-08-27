import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const GigManagerLayout = dynamic(() => import("../../../components/dashboards/gigmanager/gigmanagerlayout"));
const Title = dynamic(() => import("../../../components/title"));

export default function Notification() {
  

  return (
    
      <>
        <Title page="Notifications" />
        <GigManagerLayout>
          <div>Notifications</div>
        </GigManagerLayout>
      </>
    )
}