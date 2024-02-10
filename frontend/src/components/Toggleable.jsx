import { Children, useState, cloneElement } from "react"

const Toggleable = ({ label, children }) => {
  const [displayContents, setDisplayContents] = useState(false)

  if (displayContents) {
    return <>
      {Children.map(children, (child) => cloneElement(child, {setVisibility: setDisplayContents}))}
      <button onClick={() => setDisplayContents(false)}>close</button>
    </>
  } else {
    return <button onClick={() => setDisplayContents(true)}>
      {label}
    </button>
  }
}

export default Toggleable