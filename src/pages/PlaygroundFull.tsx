import React from 'react';
import { Editor } from '../components/EditorFull';
// import useLocalStorage from '../../hooks/useLocalStorage';
import '../assets/styles/editorFull.css';

function PlaygroundFull() {
  const [html, setHtml] = React.useState('')
  const [css, setCss] = React.useState('')
  const [js, setJs] = React.useState('')
  const [srcDoc, setSrcDoc] = React.useState('')

//   const [html, setHtml] = useState(`<html>
//   <head>
//   <title>Hello</title>
//   </head>
//   <body>
//       <h1>Hello!</h1>
//       <p>Write HTML, CSS or JavaScript code here and click 'Run Code'.</p>
//   </body>
// </html>`, '')

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
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane dark:bg-trueGray-200">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  )
}

export default PlaygroundFull;
