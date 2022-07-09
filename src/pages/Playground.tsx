/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import Editor from "@monaco-editor/react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const cssThumbnail = require("../assets/images/css-logo.png").default;
const base = `<!DOCTYPE html>
<html>
  <head>
    <style>
      h1 {
        color: green;
      }
    </style>
  </head>
  <body>
      <h1>Hello!</h1>
      <p>Write HTML & CSS code here.</p>
  </body>
</html>`;

export const Playground = () => {
  const { dark, playgroundCode } = useSelector((state: RootState) => state.app);
  const [code, setCode] = React.useState(base);
  const [srcDoc, setSrcDoc] = React.useState("");

  React.useEffect(() => {
    if (playgroundCode) {
      setCode(playgroundCode);
    }
  }, [playgroundCode]);


  React.useEffect(() => {
    const timeout = setTimeout(() => {
    setSrcDoc(`
        <html>
        <body>${code}</body>
        </html>
    `)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [code])

  // console.log(srcDoc)

  return (
    <>
    {/* {srcDoc!=null ? "" : "" srcDoc!=null ? "" : ""} */}
    {srcDoc!=null ? 
      <div
        className="flex-col overflow-hidden hidden lg:flex"
        style={{ height: "calc(100vh - 64px)" }}
      >
        <div className="container mx-auto flex items-center px-16 py-4 justify-between">
          <div className="font-black uppercase text-xs tracking-wider text-blue-600 dark:text-blue-400">
            Playground Kode
          </div>
          <div className="font-black uppercase text-xs tracking-wider text-blue-600 dark:text-blue-400 p-4 ml-32">
            Output Kode
          </div>
          <div className="flex space-x-6">
            <button
              onClick={() => setCode(base)}
              className=" inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none ring-2"
            >
              Reset
              <i className="fas fa-undo ml-4 mt-1" />
            </button>
          </div>
        </div>
        <div className="flex flex-1 border-t dark:border-blueGray-600">
          <div className="border-r dark:border-blueGray-600">
            <div
              className={` p-4 relative cursor-pointer hover:bg-blue-100 hover:text-blue-800 transition ease-in-out duration-200 bg-blue-100 dark:bg-blueGray-900 text-blueGray-800 `}
            >
              <img
                src={cssThumbnail}
                alt="logo thumbnail"
                className="h-8 w-8"
              />
              <div className="h-full absolute inset-y-0 right-0 flex items-center">
                <div className="rounded-tl-md rounded-bl-md bg-blue-600 w-1 h-3/5" />
              </div>
            </div>
          </div>
          <div className="flex-2">
            <Editor
              defaultLanguage="html"
              defaultValue={code}
              value={code}
              onChange={(value) => setCode(value ?? "asd")}
              theme={dark ? "vs-dark" : "light"}
            />
          </div>
          <iframe 
            title="output"
            className="flex-2 p-4 prose dark:bg-trueGray-200 dark:prose-light max-w-none overflow-y-scroll scrollbar scrollbar-thin"
            srcDoc={srcDoc}
          >
          </iframe>
        </div>
      </div>
    : 
      <div className="flex flex-col overflow-hidden lg:hidden">
          <div className="container mx-auto flex flex-col px-6 lg:px-16 py-6 justify-between">
            <div className="flex space-x-6"></div>
          </div>
          <div className="font-black uppercase text-xs tracking-wider text-lightBlue-900 dark:text-blueGray-100 p-4 border-b dark:border-blueGray-600">
            Output Kode
          </div>
          <div className="flex-1 border-b border-t dark:border-blueGray-600">
              <iframe 
                title="output"
                className="p-4 prose dark:bg-trueGray-200 dark:prose-light dark:bg-slate-50 max-w-none overflow-y-scroll scrollbar scrollbar-thin" style={{ width: "100%", height: "auto" }}
                srcDoc={srcDoc}
              >
              </iframe>
          </div>
        <div className="flex-1 border-b border-t">
          <div className="p-4 font-black uppercase text-xs tracking-wider text-blue-600 dark:text-blue-400">
            Playground Kode
            <button
                onClick={() => setCode(base)}
                className="inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none ring-2 ml-96"
              >
                Reset
                <i className="fas fa-undo ml-4 mt-1" />
              </button>
          </div>
          <div className="flex flex-1 border-t dark:border-blueGray-600">
            <div className="border-r dark:border-blueGray-600">
              <div
                className={` p-4 relative cursor-pointer hover:bg-blue-100 hover:text-blue-800 transition ease-in-out duration-200 bg-blue-100 dark:bg-blueGray-900 text-blueGray-800 `}
              >
                <img
                  src={cssThumbnail}
                  alt="logo thumbnail"
                  className="h-8 w-8"
                />
                <div className="h-full absolute inset-y-0 right-0 flex items-center">
                  <div className="rounded-tl-md rounded-bl-md bg-blue-600 w-1 h-3/5" />
                </div>
              </div>
            </div>
            <div className="flex-2" style={{ height: "calc(100vh - 64px)" }}>
              <Editor
                defaultLanguage="html"
                defaultValue={code}
                value={code}
                onChange={(value) => setCode(value ?? "asd")}
                theme={dark ? "vs-dark" : "light"}
              />
            </div>
          </div>
        </div>
      </div>
      }
    </>
  );
};

export default Playground;
