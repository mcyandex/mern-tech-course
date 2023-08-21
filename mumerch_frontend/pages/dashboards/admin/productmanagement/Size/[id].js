import axios from "axios";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const Title = dynamic(() => import("../../../../components/title"));

export default function UpdateSize() {
  const [size, setSize] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { id } = router.query;

  const getSizeById = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'admin/getsizebyid/' + id;
      const response = await axios.get(url,{
        withCredentials: true
      });
      if (response != null) {
        setSize(response.data);
      } else {
        setError(`${id} not found`);
      }
    } catch (err) {
      console.log(err);
      router.push('./sizelist');
    }
  }

  useEffect(() => {
    if (!id) {
      router.push('./sizelist');
    } else {
      getSizeById();
    }
  }, []);

  return (
    <>
      <Title page={'Size Details'}></Title>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="fixed inset-0 backdrop-filter backdrop-blur-md"></div>
        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-lg relative z-10">
          <div className="flex justify-end">
            <Link href={'./sizelist'}>
              <Image src="/icons/cancel.png" alt="cancel" height={25} width={25} />
            </Link>
          </div>
          <Title page="Size Details" />
          <h4 className="mb-4">Size Details</h4>
          <table className="w-full">
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
              {!size.login ? null :
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
      </div>
    </>
  )
}
