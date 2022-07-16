import React from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Editor from "@monaco-editor/react";

export const PlaygroundFull = () => {
  const { dark } = useSelector((state: RootState) => state.app);
  const [html, setHtml] = React.useState(`<!-- html -->
<html>
  <head>
  <title>Hello</title>
  </head>
  <body>
      <h1>Hello!</h1>
      <p>Write HTML, CSS or JavaScript code here and click 'Run Code'.</p>

      <h2 id="result"></h2>
  </body>
</html>`)
  const [css, setCss] = React.useState(`/* css */
h1 {
  color: lightblue;
}

#result{
  color: green;
}`)
  const [js, setJs] = React.useState(`// javascript
var x = 5;
var y = 4;
var z = x + y;
document.getElementById("result").innerHTML = z;`)
  const [srcDoc, setSrcDoc] = React.useState("")

//   const [css, setCss] = useState(`h1 {
//   color: red;
// }
// p {
//   font-family: arial, sans-serif;
// }`, '')

  // const [srcDoc, setSrcDoc] = useState('')

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  return (
    <>
    {/* <div className="my-4 px-3 font-black text-xs tracking-wider text-blue-600 dark:text-blue-400">SCRIPT KODE */}
      <div className="border" style={{ height: "50vh", display: "flex" }}>
        <Editor
          defaultLanguage="html"
          defaultValue={html}
          value={html}
          onChange={(value) => setHtml(value ?? "asd")}
          theme={dark ? "vs-dark" : "light"}
        />
        <Editor
          defaultLanguage="css"
          defaultValue={css}
          value={css}
          onChange={(value) => setCss(value ?? "asd")}
          theme={dark ? "vs-dark" : "light"}
        />
        <Editor
          defaultLanguage="javascript"
          defaultValue={js}
          value={js}
          onChange={(value) => setJs(value ?? "asd")}
          theme={dark ? "vs-dark" : "light"}
        />
      </div>
    {/* </div> */}
    {/* <div className='my-4 px-3 font-black text-xs tracking-wider text-blue-600 dark:text-blue-400'>OUTPUT KODE */}
      <div className="dark:bg-trueGray-200" style={{ height: "50vh", display: "flex" }}>
        <iframe
          className="flex-2 dark:bg-trueGray-200 max-w-none overflow-y-scroll scrollbar scrollbar-thin"
          srcDoc={srcDoc}
          title="output"
        />
      </div>
    {/* </div> */}
    </>
  )
}

export default PlaygroundFull;
