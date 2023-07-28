export default function Title(props) {
  console.log(props)
  return (
    <>
      <head>
        <title>MuMerch - {props.page}</title>
      </head>
    </>
  )
}