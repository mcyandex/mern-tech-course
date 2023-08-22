import dynamic from "next/dynamic"
import React from 'react';
import { useRouter } from "next/router"
const AdminLayout = dynamic(() => import("../../components/dashboards/admin/adminlayout"))
const Title = dynamic(() => import("../../components/title"))

export default function AdminDashboard() {
  const router = useRouter()
  const uid = router.query.uid
  const username = router.query.username
  return (
    <>
      <Title page="Admin Dashboard"></Title>
      <AdminLayout>
        <div id="fullWidthTabContent" class="border-t border-gray-200 dark:border-gray-600">
          <div class="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="stats" role="tabpanel" aria-labelledby="stats-tab">
            <dl class="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8">
              <div class="flex flex-col items-center justify-center">
                <dt class="mb-2 text-3xl font-extrabold">73M+</dt>
                <dd class="text-gray-800 dark:text-gray-400">Developers</dd>
              </div>
              <div class="flex flex-col items-center justify-center">
                <dt class="mb-2 text-3xl font-extrabold">100M+</dt>
                <dd class="text-gray-800 dark:text-gray-400">Public repositories</dd>
              </div>
              <div class="flex flex-col items-center justify-center">
                <dt class="mb-2 text-3xl font-extrabold">1000s</dt>
                <dd class="text-gray-800 dark:text-gray-400">Open source projects</dd>
              </div>
              <div class="flex flex-col items-center justify-center">
                <dt class="mb-2 text-3xl font-extrabold">1B+</dt>
                <dd class="text-gray-800 dark:text-gray-400">Contributors</dd>
              </div>
              <div class="flex flex-col items-center justify-center">
                <dt class="mb-2 text-3xl font-extrabold">90+</dt>
                <dd class="text-gray-800 dark:text-gray-400">Top Forbes companies</dd>
              </div>
              <div class="flex flex-col items-center justify-center">
                <dt class="mb-2 text-3xl font-extrabold">4M+</dt>
                <dd class="text-gray-800 dark:text-gray-400">Organizations</dd>
              </div>
            </dl>
          </div>
          </div>
      </AdminLayout>
    </>
  )
}