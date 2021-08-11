/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import Editor from "@monaco-editor/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { fetchCompile } from "../redux/actions/compileActions";
import Parse from "../components/HTMLParser";
import HashLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import { setPlaygroundCode } from "../redux/actions/appActions";

const phpThumbnail = require("../assets/images/php-logo-thumbnail.png").default;
const base = `<!DOCTYPE html>
<html>
<body>
  
<?php
echo "My first script!";
?> 
  
</body>
</html>`;

export const Playground = () => {
  const { dark, playgroundCode } = useSelector((state: RootState) => state.app);
  const [loading, setLoading] = React.useState(false);
  const [progLanguage] = React.useState("php");
  const [code, setCode] = React.useState(base);
  const [resHtml, setResHtml] = React.useState("");
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (playgroundCode) {
      setCode(playgroundCode);
    }
  }, [playgroundCode]);

  React.useEffect(() => {
    dispatch(setPlaygroundCode(null));
  }, [code]);

  const onCompile = () => {
    setLoading(true);
    dispatch(
      fetchCompile.request({
        code,
        progLanguage,
        onSuccess: (res) => {
          setLoading(false);
          setResHtml(res);
          toast.success("Compile successful!", {});
        },
        onFailure: (err) => {
          setLoading(false);
          setResHtml(err.message);
          toast.error("Compile failed!", {});
        },
      })
    );
  };

  return (
    <>
      <div
        className="flex-col overflow-hidden hidden lg:flex"
        style={{ height: "calc(100vh - 64px)" }}
      >
        <div className="container mx-auto flex items-center px-16 py-4 justify-between">
          <div className="font-black uppercase text-xs tracking-wider text-blue-600 dark:text-blue-400">
            Playground Kode
          </div>
          <div className="flex space-x-6">
            <button
              onClick={() => setCode(base)}
              className=" inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none ring-2"
            >
              Reset
              <i className="fas fa-undo ml-4 mt-1" />
            </button>
            <button
              onClick={onCompile}
              disabled={loading}
              className={`inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white  focus:outline-none ${
                loading ? "bg-blueGray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Jalankan Kode
              <i className="fas fa-code ml-4 mt-1" />
            </button>
          </div>
        </div>
        <div className="flex flex-1 border-t dark:border-blueGray-600">
          <div className="border-r dark:border-blueGray-600">
            <div
              className={` p-4 relative cursor-pointer hover:bg-blue-100 hover:text-blue-800 transition ease-in-out duration-200 bg-blue-100 dark:bg-blueGray-900 text-blueGray-800 `}
            >
              <img
                src={phpThumbnail}
                alt="logo thumbnail"
                className="h-8 w-8"
              />

              <div className="h-full absolute inset-y-0 right-0 flex items-center">
                <div className="rounded-tl-md rounded-bl-md bg-blue-600 w-1 h-3/5" />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <Editor
              defaultLanguage="php"
              defaultValue={code}
              value={code}
              onChange={(value) => setCode(value ?? "asd")}
              theme={dark ? "vs-dark" : "light"}
            />
          </div>
          <div className="flex-1 border-l dark:border-blueGray-600">
            <div className="font-black uppercase text-xs tracking-wider text-lightBlue-900 dark:text-blueGray-100 p-4 border-b dark:border-blueGray-600">
              Output Kode
            </div>
            {!loading ? (
              <article className="p-4 prose dark:prose-light max-w-none overflow-y-scroll scrollbar scrollbar-thin">
                <Parse html={resHtml} />
              </article>
            ) : (
              <div className="h-40 flex justify-center items-center bg-">
                {dark ? (
                  <HashLoader color="rgb(255, 255, 255)" size={40} />
                ) : (
                  <HashLoader color="rgb(30, 64, 175)" size={40} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col overflow-hidden lg:hidden">
        <div className="container mx-auto flex flex-col px-6 lg:px-16 py-6 justify-between">
          <div className="font-black uppercase text-xs tracking-wider text-blue-600 dark:text-blue-400">
            Playground Kode
          </div>
          <div className="flex space-x-6 mt-2">
            <button
              onClick={() => setCode(base)}
              className=" inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none ring-2"
            >
              Reset
              <i className="fas fa-undo ml-4 mt-1" />
            </button>
            <button
              onClick={onCompile}
              disabled={loading}
              className={`inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white  focus:outline-none ${
                loading ? "bg-blueGray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Jalankan Kode
              <i className="fas fa-code ml-4 mt-1" />
            </button>
          </div>
        </div>
        <div className="flex-1 border-b border-t dark:border-blueGray-600">
          <div className="font-black uppercase text-xs tracking-wider text-lightBlue-900 dark:text-blueGray-100 p-4 border-b dark:border-blueGray-600">
            Output Kode
          </div>
          {!loading ? (
            <article className="p-4 prose dark:prose-light max-w-none overflow-y-scroll scrollbar scrollbar-thin">
              <Parse html={resHtml} />
            </article>
          ) : (
            <div className="h-40 flex justify-center items-center bg-">
              {dark ? (
                <HashLoader color="rgb(255, 255, 255)" size={40} />
              ) : (
                <HashLoader color="rgb(30, 64, 175)" size={40} />
              )}
            </div>
          )}
        </div>
        <div className="flex flex-1 border-t dark:border-blueGray-600">
          <div className="border-r dark:border-blueGray-600">
            <div
              className={` p-4 relative cursor-pointer hover:bg-blue-100 hover:text-blue-800 transition ease-in-out duration-200 bg-blue-100 dark:bg-blueGray-900 text-blueGray-800 `}
            >
              <img
                src={phpThumbnail}
                alt="logo thumbnail"
                className="h-8 w-8"
              />

              <div className="h-full absolute inset-y-0 right-0 flex items-center">
                <div className="rounded-tl-md rounded-bl-md bg-blue-600 w-1 h-3/5" />
              </div>
            </div>
          </div>
          <div className="flex-1" style={{ height: "calc(100vh - 64px)" }}>
            <Editor
              defaultLanguage="php"
              defaultValue={code}
              value={code}
              onChange={(value) => setCode(value ?? "asd")}
              theme={dark ? "vs-dark" : "light"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Playground;
