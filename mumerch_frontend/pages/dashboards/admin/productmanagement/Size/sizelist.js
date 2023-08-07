import axios from "axios"
import dynamic from "next/dynamic"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { type } from "os"
const AdminLayout = dynamic(() => import("../../../../components/dashboards/admin/adminlayout"))
const Title = dynamic(() => import("../../../../components/title"))

export default function SizeList() {
  const [name, setName] = useState('')
  const [measurement, setMeasurement] = useState(0)
  const [searchName, setSearchName] = useState('')
  const [sizes, setSizes] = useState('')
  const [error, setError] = useState('')
  const [addionError, setAdditionError] = useState('')
  const [message, setMessage] = useState('')
  const [additionMessage, setAdditionMessage] = useState('')
  const handleChangeSearchName = (e) => {
    setSearchName(e.target.value)
  }
  const handleChangeName = (e) => {
    setName(e.target.value)
  }
  const handleChangeMeasurement = (e) => {
    const value = parseInt(e.target.value)
    setMeasurement(isNaN(value) ? 0 : value);
  }
  const handleAdd = async (e) => {
    e.preventDefault()
    if (!name || !measurement) {
      setAdditionError('Must provide name and measurement properly')
    }
    else {
      const result = await addSize(name, measurement)
      if (result != null) {
        setAdditionMessage(`Size added successfully`)
      }
      else {
        setAdditionError(`Size Couldnot added`)
      }
      setName('')
      setMeasurement(0)
    }
  }
  async function addSize(name, measurement) {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+'admin/addsize'
      const sizeData = {
        name: name,
        measurement: measurement
      }
      console.log(sizeData)
      console.log(typeof measurement)
      const result = await axios.post(url, sizeData);
      console.log(result.data)
      return result.data
    }
    catch (err) {
      console.log(err)
      setAdditionError('Something went wrong, try again')
    }
  }
  // const handleDelete = async (id) => {
  //   try {
  //     const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'admin/deletesize/' + id
  //     const result = await axios.delete(url)
  //     setMessage(result.data)
  //   }
  //   catch (err) {
  //     setError('Couldnot perform delete operations, try again')
  //   }
  // }
  useEffect(() => {
    const getSizes = async (e) => {
      try {
        const searchingName = searchName == undefined ? undefined : searchName
        const url = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'admin/getsizebyname/' + searchingName;
        const result = await axios.get(url)
        setSizes(result.data)
        if (sizes.length == 0) {
          setError(`No size found in name: ${searchName}`)
        }
      }
      catch (err) {
        console.log(err)
        setError("Something went wrong, please try again letter")
      }
    };
    getSizes();
  }, [searchName]);
  return (
    <>
      <Title page="Size List"></Title>
      <AdminLayout>
        <div>
          <h3>Size Corner</h3>
          <div>
            <p>Add Size</p>
            <form onSubmit={handleAdd}>
              <input name="name" type="text" placeholder="Enter Size Name" onChange={handleChangeName} />
              <br />
              <input name="measurement" type="number" placeholder="Enter Neck Measurement" onChange={handleChangeMeasurement} />
              <br />
              <input type="submit" value="Add" />
            </form>
            <span>{addionError && <p>{addionError}</p>}</span>
            <span>{additionMessage && <p>{additionMessage}</p>}</span>
          </div>
          <hr />
          <div>
            <input type="text" name="name" placeholder="Search By Name" onKeyUp={handleChangeSearchName} />
            <button>Search</button>
            <span>{error && <p>{error}</p>}</span>
          </div>
          <div>
            <p>Size List</p>
            <span>{message && <p>{message}</p>}</span>
            {Array.isArray(sizes) ? (
              <table border={1}>
                <tbody>
                  <tr>
                    <td>No.</td>
                    <td>Name</td>
                    <td>Nech Measurement (inch)</td>
                    <td>Updated By</td>
                    <td></td>
                  </tr>
                  {sizes.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.measurement}</td>
                      <td>{item.login.name}</td>
                      <td>
                        <Link href={`./updatesize/${item.id}`}>
                          <Image src="/icons/update.png" alt='Update' width={10} height={10} />
                        </Link>
                        <button>
                          <Image src="/icons/delete.png" alt='Delete' width={10} height={10} />
                        </button>
                        <Link href={`./${item.id}`}>
                          <Image src="/icons/details.png" alt='Details' width={10} height={10} />
                        </Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>No sizes created yet</div>
            )
            }
          </div>
        </div>
      </AdminLayout>
    </>
  )
}