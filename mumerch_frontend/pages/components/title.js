import Head from "next/head"

export default function Title(props) {
  const title = props.page!=null ? props.page : "A marchendise management app"
  return (
    <>
      <Head>
        <title>MuMerch - {title}</title>
      </Head>
    </>
  )
}