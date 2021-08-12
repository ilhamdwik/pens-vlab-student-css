import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { setPlaygroundCode } from "../redux/actions/appActions";
import { RootState } from "../redux/store";

export const Markdown = ({ markdown }: { markdown: string }) => {
  const dark = useSelector((state: RootState) => state.app.dark);

  const dispatch = useDispatch();
  return (
    <div>
      <ReactMarkdown
        components={{
          code: ({ className, inline, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <div>
                <SyntaxHighlighter
                  style={dark ? atomOneDark : atomOneLight}
                  language={match[1]}
                  children={String(children).replace(/\n$/, "")}
                  customStyle={{
                    margin: 0,
                    backgroundColor: dark ? "#0F172A" : "#F1F5F9",
                  }}
                  showLineNumbers
                  {...props}
                />

                <button
                  onClick={() => {
                    dispatch(
                      setPlaygroundCode(String(children).replace(/\n$/, ""))
                    );
                    window.open(
                      `http://${
                        process.env.REACT_APP_ENV === "DEV"
                          ? process.env.REACT_APP_DOMAIN_DEV
                          : process.env.REACT_APP_DOMAIN
                      }/playground`,
                      "_blank"
                    );
                  }}
                  className="mt-4 mr-4 inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium bg-blue-600 hover:bg-blue-700 focus:outline-none text-white"
                >
                  Coba Jalankan
                  <i className="fas fa-arrow-right ml-4 mt-1" />
                </button>
              </div>
            ) : inline ? (
              <code {...props}>{children}</code>
            ) : (
              <SyntaxHighlighter
                style={dark ? atomOneDark : atomOneLight}
                language={"php"}
                children={String(children).replace(/\n$/, "")}
                customStyle={{
                  margin: 0,
                  backgroundColor: dark ? "#0F172A" : "#F1F5F9",
                }}
                showLineNumbers
                {...props}
              />
            );
          },
          pre: (props) => {
            return <div className="mb-12" {...props}></div>;
          },
        }}
        children={markdown}
      />
    </div>
  );
};

export default Markdown;
