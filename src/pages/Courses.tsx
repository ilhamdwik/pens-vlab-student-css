/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { Courses as CoursesType } from "../types";
import nProgress from "nprogress";
import { fetchCourseList } from "../redux/actions/moduleActions";
import { Link } from "react-router-dom";
import { baseUrl } from "../apis";

export const Courses = () => {
  const dispatch = useDispatch();
  const [courseList, setCourseList] = React.useState<CoursesType>();

  React.useEffect(() => {
    nProgress.start();
    dispatch(
      fetchCourseList.request({
        onSuccess: (res) => {
          setCourseList(res);
          nProgress.done();
        },
        onFailure: (err) => {},
      })
    );

    return () => {
      // nProgress.done();
    };
  }, []);

  return (
    <div className="" style={{ minHeight: "80vh" }}>
      <div style={{}}>
        <div className="mx-auto px-32 py-8 lg:py-12 flex justify-center items-center bg-gradient-to-l from-lightBlue-200 to-blue-50 dark:from-blueGray-900 dark:to-lightBlue-900 ">
          <div className="flex-1 text-center">
            <div className="font-black uppercase text-xs lg:text-base tracking-wider text-lightBlue-600 dark:text-blue-400 mb-2">
              Course
            </div>
            <div className="text-lg lg:text-3xl text-blueGray-600 dark:text-white font-bold">
              Course yang Tersedia
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-6 lg:p-16">
        <div className="lg:grid-cols-12 lg:grid-rows-1 px-6 mb-1 hidden lg:grid">
          <div className="col-span-3 font-black uppercase  tracking-wider text-lightBlue-600 dark:text-blue-400 mb-2">
            Course
          </div>
          <div className="col-span-8 font-black uppercase  tracking-wider text-lightBlue-600 dark:text-blue-400 mb-2">
            Progress
          </div>
          <div />
        </div>
        {courseList?.map((v) => {
          let total = 0;
          let done = 0;

          v.modules.forEach((_v) => {
            _v.submodules.forEach((__v) => {
              total += 1;
              if (__v.user_progress[0]?.is_done) {
                done += 1;
              }
            });
          });
          return (
            <Disclosure key={v.id}>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex lg:grid lg:grid-cols-12 lg:grid-rows-1 items-center w-full p-6 text-sm font-medium text-left text-blue-900 bg-blue-100 dark:text-blueGray-100 dark:bg-blueGray-900 rounded hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    <div className="text-base font-bold flex items-center flex-1 lg:col-span-3">
                      <img
                        src={baseUrl + v.thumbnail_url}
                        alt="logo thumbnail"
                        className="h-8 w-8 mr-4"
                      />
                      <div className="flex-1">
                        <span>{v.name}</span>
                        <div className="col-span-8 space-x-4 items-center flex mr-12 lg:hidden mt-2">
                          <div className="font-medium text-xs uppercase tracking-wider  dark:text-blueGray-100">
                            {((100 * done) / total)?.toFixed(0)}%
                          </div>
                          <div className="flex flex-1 flex-col justify-center">
                            <div className="overflow-hidden h-1 text-xs flex rounded bg-blue-50 dark:bg-lightBlue-400">
                              <div
                                style={{
                                  width:
                                    ((100 * done) / total)?.toFixed(0) + "%",
                                }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 dark:bg-blue-800"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-8 space-x-4 items-center hidden lg:flex">
                      <div className="font-medium uppercase tracking-wider  dark:text-blueGray-100">
                        {((100 * done) / total)?.toFixed(0)}%
                      </div>
                      <div className="flex flex-1 flex-col justify-center">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-50 dark:bg-lightBlue-400">
                          <div
                            style={{
                              width: ((100 * done) / total)?.toFixed(0) + "%",
                            }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 dark:bg-blue-800"
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end items-center">
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
                    <Disclosure.Panel className="p-6 rounded bg-blue-100 dark:bg-blueGray-900 mt-1 dark:text-blueGray-100 flex flex-col lg:flex-row space-y-12 lg:space-y-0 lg:space-x-12">
                      <div className="flex-1 text-blueGray-600 dark:text-blueGray-200">
                        {v.description}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-base">Modul</div>
                        <div className="flex flex-col space-y-4 mt-4">
                          {v.modules.map((_v) => {
                            if (_v.submodules.length > 0) {
                              return (
                                <Link
                                  key={_v.id}
                                  to={`/lesson/${_v.submodules[0]?.id}`}
                                  className=" inline-flex items-center p-4 rounded bg-white dark:bg-blueGray-800 hover:text-blue-600 dark:hover:text-blue-400 transition focus:outline-none justify-between"
                                >
                                  <span>{_v.title}</span>
                                  <i className="fas fa-arrow-right" />
                                </Link>
                              );
                            } else {
                              return null;
                            }
                          })}
                        </div>

                        <Link
                          to={`/courses/${v.id}`}
                          className="mt-8 flex items-center font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800  dark:hover:text-blue-600 transition cursor-pointer"
                        >
                          Lihat semua Modul
                          <i className="fas fa-arrow-right text-xs ml-4" />
                        </Link>
                      </div>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          );
        })}
      </div>
    </div>
  );
};

export default Courses;
