/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { comments, forums } from "../types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import nProgress from "nprogress";
import {
  getDetailForums,
} from "../redux/actions/forumActions";
import {
  getComments, 
  postCreateComment,
} from "../redux/actions/commentActions";
import TextArea from "../components/TextArea";
import Button from "../components/Button";
import moment from "moment";
import { useParams } from "react-router-dom";
import { formatName } from "../utils/formatter";
import { useHistory } from 'react-router';
import { RootState } from "../redux/store";

export const ForumDetail = () => {
  const params: { id: string } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [answer, setAnswer] = React.useState("");
  const [forums, setForums] = React.useState<forums>();
  const [commentList, setCommentList] = React.useState<comments[]>([]);
  const [loading, setLoading] = React.useState(user?.id ? true : false);

  React.useEffect(() => {
    nProgress.start();
    dispatch(
      getDetailForums.request({
        id: params.id,
        onSuccess: (res) => {
          setForums(res);
          nProgress.done();
        },
        onFailure: (err) => {},
      })
    );
    dispatch(
      getComments.request({
        onSuccess: (res) => {
          setCommentList(res);
          nProgress.done();
        },
        onFailure: (err) => {},
      })
    )

    return () => {
      // nProgress.done();
    };
  }, [params.id]);

  const onCreate = () => {
    nProgress.start();
    setLoading(true);
    dispatch(
      postCreateComment.request({
        data: {
          student_id: user?.id ?? "",
          class_id: user?.class_id ?? "",
          forum_id: params.id ?? "",
          answer,
        },
        onSuccess: () => {
          nProgress.done();
          setLoading(false);
          history.go(0);
        },
        onFailure: () => {
          nProgress.done();
          setLoading(false);
        }
      })
    );
  };

  return (
    <div className="" style={{ minHeight: "80vh" }}>
      <div
        style={{}}
        // className="bg-gradient-to-l from-blueGray-300 to-blueGray-50 dark:from-blueGray-900 dark:to-lightBlue-900"
        className="bg-gradient-to-l from-lightBlue-200 to-blue-50 dark:from-blueGray-900 dark:to-lightBlue-900"
      >
        <div className="mx-auto px-32 py-8 lg:py-12">
        <Link
            to={`/forum`}
            className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800  dark:hover:text-blue-600 transition cursor-pointer"
            >
            <i className="fas fa-arrow-left text-xs mr-4 pb-4" />
            Back to Forum List
        </Link>
          <div className="flex">
            <div className="flex-1">
              <div className="text-center font-black uppercase text-xs lg:text-base tracking-wider text-lightBlue-600 dark:text-blue-400 mb-2">
                Forum Detail
              </div>
              <div className="text-xl text-center lg:text-2xl text-blueGray-600 dark:text-blueGray-200">
                {forums?.question} 
              </div>
              {/* <div className="mt-4 text-sm lg:text-lg text-lightBlue-600 dark:text-blue-400">
                {formatName(forums?.students?.name ?? "")} {" / "} {forums?.classes?.kelas}
              </div>
              <div className="text-base text-blueGray-800 dark:text-blueGray-200 ">
                {moment(forums?.createdAt).format(
                  "HH:mm, DD MMMM YYYY"
                )}
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 mt-12">
        <div className="flex-1 text-center">
          <div className="font-black uppercase text-xs lg:text-base tracking-wider text-lightBlue-600 dark:text-blue-400">
            comments
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 lg:px-16 py-8 flex flex-col space-y-8 justify-center">
        <div className="lg:grid lg:grid-rows-1 lg:grid-cols-8 bg-white dark:bg-blueGray-900 border rounded-md border-blueGray-300 dark:border-blueGray-900">
          <div className="col-span-9 text-blueGray-800 dark:text-blueGray-100 font-medium flex flex-col space-y-px bg-white dark:bg-blueGray-800">     
            {commentList?.map((v) => {
              return(
                <>
                  {forums?.id === v.forum_id ?
                    <div className={`flex items-center p-6 relative border-t-2 dark:border-blue-600 dark:bg-blueGray-900 transition ease-in-out duration-200 }`}>
                      <div className="flex-1 flex items-center">
                        <div>
                          <div className="font-bold text-lightBlue-600 dark:text-blue-400">
                            {formatName(v.students?.name ?? "")} {" / "} {v.classes?.kelas}
                          </div>
                          <div className="font-normal text-sm text-justify pr-6">
                            {v.answer}
                          </div>
                        </div>
                      </div>
                      {/* <span className="px-3 inline-flex font-semibold rounded-full bg-blueGray-300 dark:bg-lightBlue-900 text-blue-800 dark:text-blueGray-100"> */}
                      <span className="px-3 inline-flex font-semibold rounded-full bg-blue-100 dark:bg-lightBlue-900 text-blue-800 dark:text-blueGray-100">
                        {moment(v.createdAt).format(
                          "HH:mm, DD MMMM YYYY"
                        )}
                      </span>
                    </div>
                  : null}
                </>
              );
            })}
          </div>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (user?.id) {
            // onUpdate();
            onCreate();
          }
        }}
        className="flex space-x-16"
      >
        <div className="container mx-auto px-6 lg:px-16 pb-10">
          <div className="bg-white dark:bg-blueGray-900 border rounded-md border-blueGray-300 dark:border-blueGray-900">
            <div className="py-4 px-4 font-medium flex flex-col space-y-px">
              <TextArea
                className="text-blueGray-600 dark:text-blueGray-200"
                placeholder="Text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
            <div className="py-2 px-4 lg:grid lg:grid-rows-1 lg:grid-cols-12">
              <Button
                disabled={
                  !answer || !loading
                }
                className="col-span-2"
              >
                <i className="fas fa-paper-plane mr-2" />
                Send
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForumDetail;