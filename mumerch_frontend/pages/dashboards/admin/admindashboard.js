import dynamic from "next/dynamic"
import React from 'react';
import { useRouter } from "next/router"
const AdminLayout = dynamic(()=>import("../../components/dashboards/admin/adminlayout"))
const Title = dynamic(()=>import("../../components/title"))

export default function AdminDashboard() {
  const router = useRouter()
  const uid = router.query.uid
  const username = router.query.username
  return (
    <>
      <Title page="Admin Dashboard"></Title>
      <AdminLayout uid={uid} uname={username}>
        <div>
          <h3>Welcome {username}</h3>
          <h3>This is Admin Dashboard</h3>
        </div>
      </AdminLayout>
    </>
  )
}