import axios from "axios"
import dynamic from "next/dynamic"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
const Title = dynamic(() => import("../../../../components/title"))

export default function UpdateSize() {
  const [size, setSize] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const { id } = router.query
  const getSizeById = async (e) => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'admin/getsizebyid/' + id
      const responce = await axios.get(url)
      if (responce != null) {
        setSize(responce.data)
      }
      else {
        setError(`${id} not found`)
      }
    }
    catch (err) {
      console.log(err)
      router.push('./sizelist')
    }
  }
  useEffect(() => {
    if (!id) {
      router.push('./sizelist')
    }
    else {
      getSizeById()
    }
  }, [])
  return (
    <>
      <Title page="Size Details"></Title>
      <div>
        <Link href={'./sizelist'}>
          <Image src="/icons/cancel.png" alt="cancel" height={25} width={25} />
        </Link>
        <h4>Size Details</h4>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>:</td>
              <td>{size.name}</td>
            </tr>
            <tr>
              <td>Neck Measurement (inch)</td>
              <td>:</td>
              <td>{size.measurement}</td>
            </tr>
            {!size.login ? "" :
              (
                <tr>
                  <td>Updated By</td>
                  <td>:</td>
                  <td>{size.login.name}</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </>
  )
}