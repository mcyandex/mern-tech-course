import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const AdminLayout = dynamic(() => import("../../../components/dashboards/admin/adminlayout"));
const Title = dynamic(() => import("../../../components/title"));

export default function Notification() {
  

  return (
    
      <>
        <Title page="Notifications" />
        <AdminLayout>
          <div>Notifications</div>
        </AdminLayout>
      </>
    )
}