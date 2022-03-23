/* eslint-disable react-hooks/exhaustive-deps */
import nProgress from "nprogress";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { baseUrl } from "../apis";
import { fetchCourseDetail } from "../redux/actions/moduleActions";
import { Course } from "../types";
import { Button } from "../components/Button";

export const CourseDetail = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const history = useHistory();
  const params: { id: string } = useParams();
  const dispatch = useDispatch();
  const [courseDetail, setCourseDetail] = React.useState<Course>();
  const [percentProgress, setPercentProgress] = React.useState<number>();

  React.useEffect(() => {
    nProgress.start();
    dispatch(
      fetchCourseDetail.request({
        id: params.id,
        onSuccess: (res) => {
          let total = 0;
          let done = 0;

          res.modules.forEach((v) => {
            v.submodules.forEach((_v) => {
              total += 1;
              if (_v.user_progress[0]?.is_done) {
                done += 1;
              }
            });
          });

          setPercentProgress((done / total) * 100);
          setCourseDetail(res);
          nProgress.done();
        },
        onFailure: (err) => {},
      })
    );

    return () => {
      nProgress.done();
    };
  }, []);
  return (
    <div className="" style={{ minHeight: "80vh" }}>
      <div
        style={{}}
        className="bg-gradient-to-l from-blueGray-300 to-blueGray-50 dark:from-blueGray-900 dark:to-lightBlue-900"
      >
        <div className="container mx-auto px-6 lg:px-16 py-12 flex flex-col space-y-8 justify-center   ">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-6 lg:space-y-0 lg:space-x-12">
            <img
              src={baseUrl + courseDetail?.thumbnail_url}
              alt="logo thumbnail"
              className="h-12 w-12 lg:h-32 lg:w-32 rounded"
            />
            <div className="flex-1 flex flex-col space-y-2">
              <div className="font-black uppercase text-base tracking-wider text-lightBlue-600 dark:text-blue-400">
                Course
              </div>
              <div className="text-3xl text-blueGray-600 dark:text-white font-bold">
                {courseDetail?.name}
              </div>
              <div className="col-span-8 flex space-x-4 items-center pt-2">
                <div className="font-medium uppercase tracking-wider  dark:text-blueGray-100">
                  {percentProgress?.toFixed(0)}%
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-50 dark:bg-lightBlue-400">
                    <div
                      style={{ width: percentProgress + "%" }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blueGray-600 dark:bg-blue-800"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 text-blueGray-600 dark:text-blueGray-200">
            {courseDetail?.description}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 lg:px-16 py-12">
        {courseDetail?.modules.length !== 0 ?
          <div className="lg:grid lg:grid-rows-1 lg:grid-cols-12 bg-white dark:bg-blueGray-900 rounded-lg border border-blueGray-300 dark:border-blueGray-900">
            <div className="font-bold py-4 text-blueGray-400 break-words col-span-3 border-b lg:border-b-0 lg:border-r border-blueGray-300 dark:border-blueGray-800">
              {courseDetail?.modules?.map((v, i) => {
                return (
                  <div
                    key={v.id}
                    onClick={() => setActiveIndex(i)}
                    className={` py-4 px-6 relative cursor-pointer hover:bg-blueGray-300 dark:hover:bg-blueGray-800 hover:text-blue-800 dark:hover:text-blue-400 transition ease-in-out duration-200 ${
                      activeIndex === i &&
                      "bg-blueGray-300 dark:bg-blueGray-800 text-blueGray-800 dark:text-blueGray-100"
                    }`}
                  >
                    {v.title}
                    {activeIndex === i && (
                      <div className="h-full absolute inset-y-0 right-0 flex items-center">
                        <div className="rounded-tl-md rounded-bl-md bg-blue-600 dark:bg-blue-400 w-1 h-4/5" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="col-span-9 text-blueGray-800 dark:text-blueGray-100 font-medium flex flex-col space-y-px bg-white dark:bg-blueGray-800">
              {courseDetail?.modules[activeIndex].submodules.map((v, i) => {
                const enable = (v.user_progress[0]?.is_done ||
                  courseDetail.modules[activeIndex].submodules[i - 1]
                    ?.user_progress[0]?.is_done ||
                  (v.user_progress.length === 0 && i === 0)) as boolean;
                return (
                  <div
                    onClick={() => {
                      if (enable) {
                        history.push(`/lesson/${v.id}`);
                      }
                    }}
                    key={v.id}
                    className={`flex items-center p-6 relative  bg-white border-b  dark:border-blueGray-600 dark:bg-blueGray-900  transition ease-in-out duration-200 ${
                      enable
                        ? "hover:bg-blueGray-300 dark:hover:bg-blueGray-800 hover:text-blue-800 dark:hover:text-blue-400 cursor-pointer"
                        : "text-blueGray-400 dark:text-blueGray-500"
                    }`}
                  >
                    <div className="flex-1 flex items-center">
                      <i
                        className={`text-blue-400 fas ${
                          v.is_exercise ? "fa-pencil-alt" : "fa-book"
                        } mr-6`}
                      />
                      <div>
                        <div className="font-normal text-sm">
                          {v.is_exercise ? "Latihan" : "Teori"}
                        </div>
                        <div className="font-bold">{v.title}</div>
                      </div>
                    </div>
                    {v.user_progress[0]?.is_done ? (
                      <span className="px-4 py-1 inline-flex font-semibold rounded-full bg-blueGray-300 dark:bg-lightBlue-900 text-blue-800 dark:text-blueGray-100">
                        Selesai
                      </span>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        : <>
            {/* className="flex-1 text-xl w-full items-center px-4 py-1 inline-flex font-semibold rounded-full bg-blueGray-300 dark:bg-lightBlue-900 text-blue-800 dark:text-blueGray-100 mb-4" */}
            {/* <div className="inline-flex justify-center font-medium text-2xl px-4 py-2 rounded-lg w-full mb-4">
              <span className="bg-gradient-to-r from-blue-100 to-teal-200 bg-clip-text text-transparent">
                Maaf Course ini belum memiliki Modul
              </span>
            </div> */}
            <div className="inline-flex justify-center px-4 py-2 rounded-lg w-full mb-4 text-2xl font-medium">
              <span className="text-lightBlue-800">
                Maaf Course ini belum memiliki Modul
              </span>
            </div>
            <Button
              onClick={() => {
                document.location.href = "/home";
              }}
              className="w-full "
            >
              Kembali ke Beranda
            </Button>
          </>
      }
      </div>
    </div>
  );
};

export default CourseDetail;
