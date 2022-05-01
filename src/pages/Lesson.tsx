/* eslint-disable react-hooks/exhaustive-deps */
import nProgress from "nprogress";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  fetchLesson,
  fetchUpdateProgress,
} from "../redux/actions/moduleActions";
import { Lesson as LessonType } from "../types";
import { Modal } from "../components/Modal";
import Editor from "@monaco-editor/react";
import { RootState } from "../redux/store";
import Markdown from "../components/Markdown";
import { baseUrl } from "../apis";
import { toast } from "react-toastify";

export const Lesson = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const dark = useSelector((state: RootState) => state.app.dark);
  const params: { id: string } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [lesson, setLesson] = React.useState<LessonType>();
  const [code, setCode] = React.useState("");
  const [result, setResult] = React.useState("");
  const [showErrorModal, setShowErrorModal] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setResult(`
        <html>
          <body>${code}</body>
        </html>
        `)
    }, 1000)
    return () => clearTimeout(timeout)
  }, [code])

  React.useEffect(() => {
    nProgress.start();
    dispatch(
      fetchLesson.request({
        id: params.id,
        onSuccess: (res) => {
          setLesson(res);

          if (res.user_progress[0]?.last_answer) {
            setResult(res.user_progress[0]?.last_answer);
          }

          if (res.is_exercise) {
            setCode(res.submodule_exercises.placeholder);
          }
          if (
            res.modules.submodules.findIndex((v) => v.id === params.id) > 0 &&
            !res.modules.submodules[
              res.modules.submodules.findIndex((v) => v.id === params.id) - 1
            ].user_progress[0]?.is_done
          ) {
            setShowErrorModal(true);
          }
          setActiveIndex(
            res.modules.submodules.findIndex((v) => v.id === params.id)
          );
          nProgress.done();
        },
        onFailure: (err) => {},
      })
    );

    return () => {
      nProgress.done();
    };
  }, [params.id]);

  const onNext = () => {
    nProgress.start();
    dispatch(
      fetchUpdateProgress.request({
        data: {
          id: params.id,
          answer: result,
          code,
        },
        onSuccess: () => {
          nProgress.done();
          if (lesson) {
            window.scrollTo(0, 0);
            if (activeIndex + 1 === lesson?.modules?.submodules?.length) {
              toast.success("Module finished!");
            }
            history.push(
              activeIndex + 1 < lesson?.modules?.submodules?.length
                ? `/lesson/${lesson?.modules?.submodules[activeIndex + 1].id}`
                : `/courses/${lesson.modules.prog_languages.id}`
            );
          }
        },
        onFailure: (err) => {
          nProgress.done();
          toast.error(err.response.data.message);
        },
      })
    );
  };

  return (
    <div className="" style={{ minHeight: "80vh" }}>
      <Modal
        open={showErrorModal}
        title="Error"
        content="Mohon selesaikan course sebelumnya terlebih dahulu"
        buttons={[{ text: "OK" }]}
        onClose={() => {
          history.replace(`/courses/${lesson?.modules.prog_languages.id}`);
        }}
      />
      <div
        style={{}}
        // className="bg-gradient-to-l from-blueGray-300 to-blueGray-50 dark:from-blueGray-900 dark:to-lightBlue-900"
        className="bg-gradient-to-l from-lightBlue-200 to-blue-50 dark:from-blueGray-900 dark:to-lightBlue-900"
      >
        <div className="container mx-auto px-6 lg:px-16 py-6 flex flex-col space-y-6 justify-center   ">
          <Link
            to={`/courses/${lesson?.modules.prog_languages.id}`}
            className="flex items-center font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800  dark:hover:text-blue-600 transition cursor-pointer"
          >
            <i className="fas fa-arrow-left text-xs mr-4" />
            Back to Module List
          </Link>
          <div className="flex items-center space-x-8">
            <img
              src={baseUrl + lesson?.modules.prog_languages.thumbnail_url}
              alt="logo thumbnail"
              className="h-16 w-16 rounded"
            />
            <div className="flex-1 flex flex-col space-y-2">
              <div className="font-black uppercase tracking-wider text-lightBlue-600 dark:text-blue-400">
                {lesson?.modules?.prog_languages.name}
              </div>
              <div className="text-2xl text-blueGray-600 dark:text-white font-bold">
                {lesson?.modules?.title}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 lg:px-16 py-12">
        <div className="lg:grid lg:grid-rows-1 lg:grid-cols-11 gap-8">
          <div className="font-bold py-4 mb-8 lg:mb-0 text-blueGray-400 break-words text-justify col-span-3 border-r dark:border-blueGray-800 bg-white dark:bg-blueGray-900 rounded border border-blueGray-300 dark:border-blueGray-900">
            {lesson?.modules?.submodules?.map((v, i) => {
              const enable = (v.user_progress[0]?.is_done ||
                lesson.modules.submodules[i - 1]?.user_progress[0]
                  ?.is_done) as boolean;
              return (
                <div
                  key={v.id}
                  onClick={() => {
                    if (enable) {
                      history.push(`/lesson/${v.id}`);
                    }
                  }}
                  className={`flex items-center py-4 px-6 relative  ${
                    enable
                      // ? "hover:bg-blueGray-300 dark:hover:bg-blueGray-800 hover:text-blue-800 dark:hover:text-blue-400 cursor-pointer text-blueGray-800 dark:text-blueGray-100"
                      ? "hover:bg-blue-100 dark:hover:bg-blueGray-800 hover:text-blue-800 dark:hover:text-blue-400 cursor-pointer text-blueGray-800 dark:text-blueGray-100"
                      : "text-blueGray-400 dark:text-blueGray-500"
                  }  transition ease-in-out duration-200 ${
                    // activeIndex === i && "bg-blueGray-300 dark:bg-blueGray-800 "
                    activeIndex === i && "bg-lightBlue-50 dark:bg-blueGray-800 "
                  }`}
                >
                  <i
                    className={`fas ${
                      v.is_exercise ? "fa-pencil-alt" : "fa-book"
                    } mr-4`}
                  />
                  <div className="flex-1">
                    <div className="font-normal text-sm">
                      {v.is_exercise ? "Latihan" : "Teori"}
                    </div>
                    <div>{v.title}</div>
                  </div>
                  {v.user_progress[0]?.is_done ? (
                    // <div className="px-4 py-1 text-xs inline-flex font-semibold rounded-full bg-blueGray-300 dark:bg-lightBlue-900 text-blue-800 dark:text-blueGray-100">
                    <div className="px-4 py-1 text-xs inline-flex font-semibold rounded-full bg-blue-100 dark:bg-lightBlue-900 text-blue-800 dark:text-blueGray-100">  
                      Completed
                    </div>
                  ) : null}
                  {activeIndex === i && (
                    <div className="h-full absolute inset-y-0 right-0 flex items-center">
                      <div className="rounded-tl-md rounded-bl-md bg-blue-600 dark:bg-blue-400 w-1 h-4/5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="col-span-8">
            <article className="prose dark:prose-light max-w-none">
              <div className="text-sm font-medium mb-1">
                {lesson ? (lesson.is_exercise ? "Latihan" : "Teori") : ""}
              </div>
              <div className="text-3xl font-bold">{lesson?.title}</div>
              <div className="border-t dark:border-blueGray-600 my-6" />
              {lesson?.is_exercise ? (
                <div>
                  <Markdown markdown={lesson?.contents ?? ""} />
                  <h4>Output yang Diharapkan</h4>
                  <pre>
                    <code>{lesson.submodule_exercises.expected_output}</code>
                  </pre>
                  <h4>Kode</h4>
                  <div className="h-80 border dark:border-blueGray-600">
                    <Editor
                      defaultLanguage="html"
                      defaultValue={code}
                      value={code}
                      onChange={(value) => setCode(value ?? "asd")}
                      theme={dark ? "vs-dark" : "light"}
                    />
                  </div>
                    {result ? ( 
                      <>
                        <h4>Output Kode</h4>
                          <iframe 
                            title="output"
                            className="p-4 bg-gray-200 dark:bg-white max-w-none overflow-y-scroll scrollbar scrollbar-thin rounded-md" style={{ width: "100%", height: "auto", borderColor: "rgb(0 0 0)" }}
                            srcDoc={result}
                          >
                          </iframe>
                      </>
                    ) : null}
                </div>
              ) : (
                <Markdown markdown={lesson?.contents ?? ""} />
              )}
            </article>
            <div className="mt-12 flex">
              {activeIndex > 0 ? (
                <Link
                  to={`/lesson/${
                    lesson?.modules?.submodules[activeIndex - 1].id
                  }`}
                  className=" inline-flex items-center px-6 py-3 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  <i className="fas fa-arrow-left mr-4 mt-1" />
                  Kembali
                </Link>
              ) : null}
              <div className="flex-1" />
              {lesson ? (
                <div
                  onClick={onNext}
                  className="cursor-pointer inline-flex items-center px-6 py-3 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  {activeIndex + 1 < lesson?.modules?.submodules?.length
                    ? "Lanjut"
                    : "Selesai"}
                  <i className="fas fa-arrow-right ml-4 mt-1" />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
