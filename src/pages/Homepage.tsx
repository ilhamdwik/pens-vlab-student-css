/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import { RootState } from "../redux/store";
import nProgress from "nprogress";
import { fetchCourseList } from "../redux/actions/moduleActions";
import { Courses } from "../types";
import { baseUrl } from "../apis";

export const Homepage = () => {
  const dispatch = useDispatch();
  const dark = useSelector((state: RootState) => state.app.dark);
  const [courseList, setCourseList] = React.useState<Courses>();

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
    <div className="dark:bg-blueGray-800 ">
      <Hero />
      <div className="container mx-auto flex flex-col lg:flex-row px-6 lg:px-16 space-y-16 lg:space-y-0 lg:space-x-16 py-16 lg:py-24 ">
        <div className="max-w-xs">
          <div className="font-black uppercase text-xs tracking-wider text-blue-600 dark:text-blue-400">
            Course
          </div>
          <div className="text-2xl text-blueGray-900 dark:text-blueGray-100 font-bold mt-4">
            Belajar dengan Course
          </div>
          <div className="mt-2 dark:text-blueGray-100">
            Mulai belajar dengan menggunakan Course yang tersedia
          </div>
          <Link to="/vlab/courses">
            <div className="mt-8 flex items-center font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 transition cursor-pointer">
              Lihat semua Course
              <i className="fas fa-arrow-right text-xs ml-4" />
            </div>
          </Link>
        </div>
        <div className="flex-1 grid lg:grid-cols-3 grid-cols-1 lg:grid-rows-1 lg:gap-8 lg:mt-2">
          {courseList?.map((v) => {
            return (
              <Link
                to={`/vlab/courses/${v.id}`}
                key={v.id}
                className="flex flex-col justify-between p-4 shadow-xl rounded-lg bg-white border-t-4 border-blue-400 dark:border-blue-600 hover:shadow-2xl hover:scale-105 transform transition focus:outline-none text-left dark:bg-blueGray-900"
              >
                <div>
                  <div className="flex items-center space-x-6 justify-between">
                    <div className="text-base font-bold dark:text-blueGray-100">
                      {v.name}
                    </div>
                    <img
                      src={baseUrl + v.thumbnail_url}
                      alt="logo thumbnail"
                      className="h-10 w-10"
                    />
                  </div>
                  <div className="mt-4 dark:text-blueGray-100">
                    {v.modules.length} Modul
                  </div>
                </div>
                <div className="mt-8 flex items-center font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 transition cursor-pointer self-end">
                  Pelajari
                  <i className="fas fa-arrow-right text-xs ml-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="bg-lightBlue-50 dark:bg-blueGray-700">
        <div className="container mx-auto flex flex-col lg:flex-row items-center px-6 lg:px-16 space-y-16 lg:space-y-0 lg:space-x-16 py-16 lg:py-24 ">
          <div className="flex-1 flex justify-end">
            <div className="max-w-xl">
              <img
                alt="..."
                className="max-w-full rounded-lg shadow-xl"
                style={{
                  transform:
                    "scale(1) perspective(1040px) rotateY(20deg) rotateX(-2deg) rotate(-2deg)",
                }}
                src={
                  dark
                    ? require("../assets/images/playground-dark.png").default
                    : require("../assets/images/playground.png").default
                }
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="font-black uppercase text-xs tracking-wider text-blue-600 dark:text-blue-400">
              Playground
            </div>
            <div className="text-2xl text-blueGray-900 font-bold mt-4 dark:text-blueGray-100">
              Bereksperimen dengan kode
            </div>
            <div className="mt-2 dark:text-blueGray-100">
              Mulai bereksperimen dengan kode menggunakan Playground
            </div>
            <Link
              to="/vlab/playground"
              className=" inline-flex items-center px-6 py-3 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none mt-8"
            >
              Buka Playground
              <i className="fas fa-arrow-right ml-4 mt-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
