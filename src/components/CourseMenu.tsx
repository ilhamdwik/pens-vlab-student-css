/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Course, Courses } from "../types";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourseDetail,
  fetchCourseList,
} from "../redux/actions/moduleActions";
import { Popover, Transition } from "@headlessui/react";
import HashLoader from "react-spinners/ClipLoader";
import { RootState } from "../redux/store";
import { baseUrl } from "../apis";

// const cssThumbnail = require("../assets/images/css-logo.png").default;

export const CourseMenu = () => {
  const dark = useSelector((state: RootState) => state.app.dark);
  const dispatch = useDispatch();
  const [panelOpened, setPanelOpened] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [courseList, setCourseList] = React.useState<Courses>();
  const [courseDetail, setCourseDetail] = React.useState<Course>();
  const [loadingCourseList, setLoadingCourseList] = React.useState(true);

  React.useEffect(() => {
    if (panelOpened) {
      setLoadingCourseList(true);
      dispatch(
        fetchCourseList.request({
          onSuccess: (res) => {
            setLoadingCourseList(false);
            setCourseList(res);
            setActiveIndex(0);
          },
          onFailure: (err) => {
            setLoadingCourseList(false);
          },
        })
      );
    } else {
      setActiveIndex(null);
      setCourseList(undefined);
      setCourseDetail(undefined);
    }
  }, [panelOpened]);

  React.useEffect(() => {
    if (activeIndex !== null && courseList) {
      dispatch(
        fetchCourseDetail.request({
          id: courseList[activeIndex]?.id,
          onSuccess: (res) => {
            setCourseDetail(res);
          },
          onFailure: (err) => {},
        })
      );
    }
  }, [activeIndex]);

  return (
    <Popover className="relative">
      {({ open }) => {
        setPanelOpened(open);
        return (
          <>
            <Popover.Button className="h-full flex items-center space-x-2 text-blueGray-800 dark:text-blueGray-100 hover:text-blue-600 transition focus:outline-none align-middle">
              <span className="font-medium">Course</span>
              <i
                className={`fas fa-chevron-down text-xs transition duration-200 transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            </Popover.Button>
            <Transition
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1 "
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Overlay
                className={`${
                  open ? "fixed inset-0 top-16 " : "opacity-0"
                } bg-black opacity-50`}
              />
            </Transition>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200 transform"
              enterFrom="opacity-0 translate-y-12"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150 transform"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-12"
            >
              <Popover.Panel className="absolute -right-60 z-10 w-screen max-w-sm px-4 mt-2 sm:px-0 lg:max-w-3xl">
                <>
                  <i className="absolute right-64 fas fa-caret-up text-4xl text-blueGray-100 dark:text-blueGray-800" />
                  <div
                    className="overflow-hidden rounded-lg ring-1 ring-black ring-opacity-5 flex mt-6 "
                    style={{ maxHeight: "500px" }}
                  >
                    <div className="bg-white dark:bg-blueGray-900 w-60 font-bold py-4 text-blueGray-400 break-words overflow-y-scroll scrollbar-thin">
                      {!loadingCourseList ? (
                        courseList?.map((v, i) => {
                          return (
                            <div
                              onClick={() => {
                                setActiveIndex(i);
                              }}
                              key={v.name}
                              className={` p-4 relative cursor-pointer hover:bg-blue-100 dark:hover:bg-blueGray-800 hover:text-blue-800 dark:hover:text-blue-400 transition ease-in-out duration-200 ${
                                activeIndex === i &&
                                "bg-blue-100 dark:bg-blueGray-800 text-blueGray-800 dark:text-blueGray-100"
                              }`}
                            >
                              {v.name}
                              {activeIndex === i && (
                                <div className="h-full absolute inset-y-0 right-0 flex items-center">
                                  <div className="rounded-tl-md rounded-bl-md bg-blue-600 dark:bg-blue-400 w-1 h-4/5" />
                                </div>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <div className="h-40 flex justify-center items-center bg-">
                          {dark ? (
                            <HashLoader color="rgb(255, 255, 255)" size={20} />
                          ) : (
                            <HashLoader color="rgb(30, 64, 175)" size={20} />
                          )}
                        </div>
                      )}
                      <Popover.Button as={Link} to="/courses">
                        <div
                          className={`w-full p-4 relative text-blue-600 dark:text-blue-400 cursor-pointer hover:bg-blue-100 dark:hover:bg-blueGray-600 hover:text-blue-800 dark:hover:text-blue-400 transition ease-in-out duration-200 `}
                        >
                          {/* Lihat semua Course */}
                          View all Courses
                          <i className="fas fa-arrow-right text-xs ml-4" />
                        </div>
                      </Popover.Button>
                    </div>
                    <div className="bg-blueGray-100 dark:bg-blueGray-800 flex-1 p-6 pb-10 flex flex-col space-y-6 overflow-y-scroll scrollbar-thin dark:text-blueGray-100">
                      {courseDetail ? (
                        <>
                          <div className="flex items-center space-x-6">
                            <img
                              src={baseUrl + courseDetail.thumbnail_url}
                              alt="logo thumbnail"
                              className="h-12 w-12"
                            />
                            <div className="text-xl font-bold">
                              {courseDetail?.name}
                            </div>
                            <div className="flex-1" />
                            <Popover.Button
                              as={Link}
                              to={`/courses/${courseDetail?.id}`}
                              className=" inline-flex items-center px-6 py-3 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none "
                            >
                              Start
                            </Popover.Button>
                          </div>
                          <div className="text-blueGray-600 dark:text-blueGray-200 text-justify">
                            {courseDetail?.description}
                          </div>
                          <div className="pb-10">
                            <div className="font-medium text-lg">Modul</div>
                            <div className="grid grid-flow-col grid-cols-2 grid-rows-3 gap-4 mt-2">
                              {courseDetail?.modules
                                .filter((v) => v.submodules[0]?.id)
                                .map((v) => {
                                  return (
                                    <Popover.Button
                                      as={Link}
                                      to={`/lesson/${v.submodules[0]?.id}`}
                                      key={v.id}
                                      className=" inline-flex items-center p-4 rounded bg-white dark:bg-blueGray-900 hover:text-blue-600 dark:hover:text-blue-400 transition focus:outline-none justify-between"
                                    >
                                      <div className="inline-flex justify-between items-center flex-1 focus:outline-none">
                                        <span>{v.title}</span>
                                        <i className="fas fa-arrow-right" />
                                      </div>
                                    </Popover.Button>
                                  );
                                })}
                              {/* <Popover.Button
                                as={Link}
                                to={`/courses/${courseDetail?.id}`}
                                className="flex items-center font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800  dark:hover:text-blue-600 transition cursor-pointer"
                              >
                                View all Modules
                                <i className="fas fa-arrow-right text-xs ml-4" />
                              </Popover.Button> */}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="h-64 flex justify-center items-center bg-">
                          {dark ? (
                            <HashLoader color="rgb(255, 255, 255)" size={20} />
                          ) : (
                            <HashLoader color="rgb(30, 64, 175)" size={20} />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              </Popover.Panel>
            </Transition>
          </>
        );
      }}
    </Popover>
  );
};
