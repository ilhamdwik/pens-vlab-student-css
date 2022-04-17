/* eslint-disable react-hooks/exhaustive-deps */
import nProgress from "nprogress";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { student_to_quiz } from "../types";
import Editor from "@monaco-editor/react";
import { RootState } from "../redux/store";
import { baseUrl } from "../apis";
import { getDetailQuiz, postSubmitQuiz } from "../redux/actions/quizActions";
import moment from "moment";
import Button from "../components/Button";
import { toast } from "react-toastify";

export const QuizDetail = () => {
  const dark = useSelector((state: RootState) => state.app.dark);
  const params: { id: string } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [code, setCode] = React.useState("");
  const [result, setResult] = React.useState("");
  const [quiz, setQuiz] = React.useState<student_to_quiz>();

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setResult(`${code}`)
    }, 1000)
    return () => clearTimeout(timeout)
  }, [code])

  React.useEffect(() => {
    nProgress.start();
    dispatch(
      getDetailQuiz.request({
        id: params.id,
        onSuccess: (res) => {
          setQuiz(res);

          nProgress.done();
        },
        onFailure: (err) => {},
      })
    );

    return () => {
      nProgress.done();
    };
  }, [params.id]);

  const onSubmit = () => {
    dispatch(
      postSubmitQuiz.request({
        data: {
          answer: result,
          code: code,
        },
        id: params.id,
        onFailure: (err) => {
          toast.error(err.message);
        },
        onSuccess: () => {
          toast.success("Quiz submitted!");
          history.replace("/quiz");
        },
      })
    );
  };

  return (
    <div className="" style={{ minHeight: "80vh" }}>
      <div
        style={{}}
        className="bg-gradient-to-l from-blueGray-300 to-blueGray-50 dark:from-blueGray-900 dark:to-lightBlue-900"
      >
        <div className="container mx-auto px-6 lg:px-16 py-6 flex flex-col space-y-6 justify-center  ">
          <Link
            to={`/quiz`}
            className="flex items-center font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800  dark:hover:text-blue-600 transition cursor-pointer"
          >
            <i className="fas fa-arrow-left text-xs mr-4" />
            Back to Quiz List
          </Link>
          <div className="flex items-center space-x-8">
            <img
              src={baseUrl + quiz?.quizzes?.prog_languages?.thumbnail_url}
              alt="logo thumbnail"
              className="h-16 w-16 rounded"
            />
            <div className="flex-1 flex flex-col space-y-2">
              <div className="font-black uppercase tracking-wider text-lightBlue-600 dark:text-blue-400">
                {quiz?.quizzes?.prog_languages?.name}
              </div>
              <div className="text-2xl text-blueGray-600 dark:text-white font-bold">
                {quiz?.quizzes?.title}
              </div>
            </div>
            {quiz?.score ? (
              <div className="flex flex-col space-y-2">
                <div className="font-black uppercase tracking-wider text-lightBlue-600 dark:text-blue-400">
                  Score
                </div>
                <div className="text-2xl text-blueGray-600 dark:text-white font-bold text-right">
                  {quiz?.score ?? "-"}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 lg:px-16 pb-12 pt-6">
        <div className="dark:text-white">
          <div className="flex flex-col lg:flex-row">
            <div className="flex-1">
              <div className="font-bold">Assignee</div>
              <div>{quiz?.quizzes?.lecturers?.name}</div>
            </div>
            <div className="flex-1 mt-6 lg:mt-0">
              <div className="font-bold">Due Time</div>
              <div>
                {moment(quiz?.quizzes?.due_time).format("HH:mm, DD MMMM YYYY")}
              </div>
            </div>
          </div>
          {quiz?.feedback ? (
            <div className="flex flex-col space-y-2 my-4">
              <div className="font-bold">
                Feedback
              </div>
              <div className="text-medium text-justify">
                {quiz?.feedback ?? "-"}
              </div>
            </div>
          ): null}
          <div className="border-t dark:border-blueGray-600 my-6" />
          <pre className="font-body break-words whitespace-pre-line ">
            {quiz?.quizzes?.question}
          </pre>
          {quiz ? (
            <article className="prose dark:prose-light max-w-none">
              <div>
                <h4>Kode</h4>
                {quiz?.is_submitted ? (
                  <>
                    <pre>
                      <code>{quiz.code}</code>
                    </pre>

                    <h4>Output</h4>
                    <iframe 
                      title="output"
                      className="p-4 bg-gray-200 dark:bg-white max-w-none overflow-y-scroll scrollbar scrollbar-thin rounded-md" style={{ width: "100%", height: "auto", borderColor: "rgb(0 0 0)" }}
                      srcDoc={quiz.answer}
                    >
                    </iframe>
                  </>
                ) : (
                  <>
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
                          <h4>Output</h4>
                          <iframe 
                            title="output"
                            className="p-4 bg-gray-200 dark:bg-white max-h-full max-w-none overflow-y-scroll scrollbar scrollbar-thin rounded-md" style={{ width: "100%", height: "auto", borderColor: "rgb(0 0 0)" }}
                            srcDoc={result}
                          >
                          </iframe>
                        </>
                      ): null}
                  </>
                )}
              </div>
            </article>
          ) : null}
          {quiz && !quiz.is_submitted ? (
            <div className="mt-12 flex">
              <div className="flex-1" />
              <Button
                onClick={() => {
                  onSubmit();
                }}
                disabled={!result}
              >
                <i className="fas fa-save mr-4 mt-1" />
                Submit
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default QuizDetail;
