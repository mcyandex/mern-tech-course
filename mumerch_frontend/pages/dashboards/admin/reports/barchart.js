import dynamic from "next/dynamic"
const AdminLayout = dynamic(() => import("../../../components/dashboards/admin/adminlayout"))
const Title = dynamic(() => import("../../../components/title"))
import BarChart from "../../../components/barcharts"
import { useState, useEffect } from "react"
import { useAlert } from "../../../utils/alertcontext"
export default function Bar() {
  const {showAlert} = useAlert()
  const data = [
    {
      "month": 1,
      "sales": 0
    },
    {
      "month": 2,
      "sales": 0
    },
    {
      "month": 3,
      "sales": 0
    },
    {
      "month": 4,
      "sales": 0
    },
    {
      "month": 5,
      "sales": 0
    },
    {
      "month": 6,
      "sales": 6
    },
    {
      "month": 7,
      "sales": 0
    },
    {
      "month": 8,
      "sales": 0
    },
    {
      "month": 9,
      "sales": 0
    },
    {
      "month": 10,
      "sales": 0
    },
    {
      "month": 11,
      "sales": 0
    },
    {
      "month": 12,
      "sales": 0
    }
  ]
  const [report, setReport]=useState([{
    "month": 1,
    "sales": 0
  },
  {
    "month": 2,
    "sales": 0
  },
  {
    "month": 3,
    "sales": 0
  },
  {
    "month": 4,
    "sales": 0
  },
  {
    "month": 5,
    "sales": 0
  },
  {
    "month": 6,
    "sales": 0
  },
  {
    "month": 7,
    "sales": 0
  },
  {
    "month": 8,
    "sales": 0
  },
  {
    "month": 9,
    "sales": 0
  },
  {
    "month": 10,
    "sales": 0
  },
  {
    "month": 11,
    "sales": 0
  },
  {
    "month": 12,
    "sales": 0
  }])
  const getReport = async (e) => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'admin/barchart';
      const result = await axios.get(url, {
        withCredentials: true
      })
      console.log(url,result.data)
    
      if (result.data != null) {
        showAlert('No Product found')
      }
      else {
        
        setReport(result.data)
      }
    }
    catch (err) {
      console.log(err)
      showAlert("Something went wrong, please try again letter")
    }
  };

  console.log(report)

  useEffect(() => {
    getReport();
  }, []);
  return (
    <>
      <Title page="Bar Chart"></Title>
      <AdminLayout>
        <div>
          <h6 className="text-xl font-semibold dark:text-white">Report Corner</h6>
          <hr className="h-px bg-gray-200 border-1 dark:bg-gray-700" />
          <div className="py-4 px-2">
          <BarChart monthlySalesData={data}></BarChart>
          </div> 
        </div>
      </AdminLayout>
    </>
  )
}
