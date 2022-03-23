/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { student_to_quiz } from "../types";
import nProgress from "nprogress";
import { getQuiz } from "../redux/actions/quizActions";
import moment from "moment";
import { baseUrl } from "../apis";
import Button from "../components/Button";
import { Link } from "react-router-dom";

export const Quiz = () => {
  const dispatch = useDispatch();
  const [quizList, setQuizList] = React.useState<student_to_quiz[]>([]);

  React.useEffect(() => {
    nProgress.start();
    dispatch(
      getQuiz.request({
        onSuccess: (res) => {
          setQuizList(res);
          nProgress.done();
        },
        onFailure: (err) => {},
      })
    );

    return () => {
      // nProgress.done();
    };
  }, []);
  console.log(quizList.length)

  return (
    <div className="" style={{ minHeight: "80vh" }}>
      <div style={{}}>
        <div className="mx-auto px-32 py-8 lg:py-12 flex justify-center items-center bg-gradient-to-l from-blueGray-300 to-blueGray-50 dark:from-blueGray-900 dark:to-lightBlue-900 ">
          <div className="flex-1 text-center">
            <div className="font-black uppercase text-xs lg:text-base tracking-wider text-lightBlue-600 dark:text-blue-400 mb-2">
              Kuis
            </div>
            <div className="text-lg lg:text-3xl text-blueGray-600 dark:text-white font-bold">
              Kuis yang Ditugaskan
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-6 lg:p-16">
        {quizList.length === 0 ? (
          <div className="h-20 flex justify-center items-center dark:text-white">
            Tidak ada Kuis
          </div>
        ) : (
          <div className="hidden lg:grid grid-cols-12 grid-rows-1 px-6 mb-1  gap-6">
            <div className="col-span-5 font-black uppercase  tracking-wider text-lightBlue-600 dark:text-blue-400 mb-2">
              Nama
            </div>
            <div className="col-span-6 font-black uppercase  tracking-wider text-lightBlue-600 dark:text-blue-400 mb-2">
              Terakhir Pengumpulan
            </div>
            <div />
          </div>
        )}

        {quizList?.map((v) => {
          return (
            <div>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className=" flex lg:grid lg:grid-cols-12 lg:grid-rows-1  gap-6 items-center w-full p-6 text-sm font-medium text-left text-blue-900 bg-blue-100 dark:text-blueGray-100 dark:bg-blueGray-900 rounded hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                      <div className="text-base font-bold flex items-center col-span-5">
                        <img
                          src={
                            baseUrl + v.quizzes?.prog_languages?.thumbnail_url
                          }
                          alt="logo thumbnail"
                          className="h-8 w-8 mr-4"
                        />
                        <div className="flex flex-col lg:block">
                          {v.quizzes?.title}
                          <div className="mt-4 lg:hidden text-sm font-normal">
                            <div className="text-xs font-bold">Due Date :</div>
                            {moment(v.quizzes?.due_time).format(
                              "HH:mm, DD MMMM YYYY"
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="hidden col-span-6 lg:flex space-x-4 items-center">
                        {moment(v.quizzes?.due_time).format(
                          "HH:mm, DD MMMM YYYY"
                        )}
                      </div>
                      <div className="flex justify-end items-center space-x-4">
                        {v.is_submitted ? (
                          <div className="px-4 py-1 text-xs inline-flex font-semibold rounded-full bg-white dark:bg-lightBlue-900 text-blue-800 dark:text-blueGray-100">
                            Selesai
                          </div>
                        ) : null}

                        <i
                          className={`${
                            open ? "fa-chevron-up" : "fa-chevron-down"
                          } fas text-purple-500`}
                        />
                      </div>
                    </Disclosure.Button>

                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform -translate-y-12 opacity-0"
                      enterTo="transform translate-y-0 opacity-100"
                      leave="transition  duration-75 ease-out"
                      leaveFrom="transform translate-y-0  opacity-100"
                      leaveTo="transform  -translate-y-12 opacity-0"
                    >
                      <Disclosure.Panel className="p-6 rounded bg-blue-100 dark:bg-blueGray-900 mt-1 dark:text-blueGray-100 lg:grid lg:grid-cols-12 lg:grid-rows-1 lg:gap-6">
                        <div className="col-span-5 text-blueGray-600 dark:text-blueGray-200 ">
                          <div className="font-bold mb-1 ">Deskripsi</div>
                          <pre className="font-body break-words whitespace-pre-line ">
                            {v.quizzes?.question}
                          </pre>
                        </div>
                        <div className="col-span-6 mt-6 lg:mt-0 mb-6 lg:mb-0">
                          <div className="font-bold mb-1">Dosen</div>
                          <div>{v.quizzes?.lecturers?.name}</div>
                          {v.score ? (
                            <>
                              <div className="font-bold mb-1 mt-6">Nilai</div>
                              <div>{v.score}</div>
                            </>
                          ) : null}
                          {v.feedback ? (
                            <>
                              <div className="font-bold mb-1 mt-6">
                                Feedback
                              </div>
                              <div>{v.feedback}</div>
                            </>
                          ) : null}
                        </div>
                        <Link to={`/quiz/${v.quiz_id}`}>
                          <Button className="w-full">Detail</Button>
                        </Link>
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
              <div className="h-8" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Quiz;
