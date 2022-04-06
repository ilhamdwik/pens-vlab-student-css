/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { comments, forums } from "../types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import nProgress from "nprogress";
import {
  getDetailForums,
} from "../redux/actions/forumActions";
import {
  getComments,
  // postCreateComment,
  // deleteComment,
} from "../redux/actions/commentActions";
import TextArea from "../components/TextArea";
import Button from "../components/Button";
// import moment from "moment";
import { useParams } from "react-router-dom";
import { formatName } from "../utils/formatter";
// import { useHistory } from 'react-router';

export const ForumDetail = () => {
  // const { id } = useParams<{ id: string }>();
  const params: { id: string } = useParams();
  const dispatch = useDispatch();
  // const history = useHistory();
  const [forums, setForums] = React.useState<forums>();
  const [commentList, setCommentList] = React.useState<comments[]>([]);
  const [question, setQuestion] = React.useState("");
  // const [loading, setLoading] = React.useState(id ? true : false);

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

  // const onCreate = () => {
  //   // nProgress.start();
  //   // setLoading(true);
  //   dispatch(
  //     postCreateForum.request({
  //       data: {
  //         author_id: user?.id ?? "",
  //         class_id: user?.class_id ?? "",
  //         question,
  //       },
  //       onSuccess: () => {
  //         // nProgress.done();
  //         // setLoading(false);
  //         toast.success("Forum berhasil ditambahkan");
  //         history.go(0);
  //       },
  //       onFailure: () => {
  //         // nProgress.done();
  //         // setLoading(false);
  //       }
  //     })
  //   );
  // };

//   const onDelete = (id: string) => {
//     Swal.fire({
//       title: "Hapus Data ?",
//       text: "Apakah anda yakin menghapus data ?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: `Hapus`,
//     }).then(({ isConfirmed }) => {
//       if (isConfirmed) {
//         dispatch(
//           deleteForum.request({
//             id: id,
//             onSuccess: () => {
//               toast.success("Data berhasil dihapus");
//               history.go(0);
//             },
//             onFailure: (err) => ({}),
//           })
//         );
//       }
//     });
//   };
  console.log(commentList.length)
  return (
    <div className="" style={{ minHeight: "80vh" }}>
      <div
        style={{}}
        className="bg-gradient-to-l from-blueGray-300 to-blueGray-50 dark:from-blueGray-900 dark:to-lightBlue-900"
      >
        <div className="mx-auto px-32 py-8 lg:py-12">
        <Link
            to={`/forum`}
            className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800  dark:hover:text-blue-600 transition cursor-pointer"
            >
            <i className="fas fa-arrow-left text-xs mr-4" />
            Back to Forum List
        </Link>
          <div className="flex items-center">
            <div className="flex-1 text-center">
              <div className="font-black uppercase text-xs lg:text-base tracking-wider text-lightBlue-600 dark:text-blue-400 mb-2">
                Forum Detail
              </div>
              <div className="text-lg lg:text-3xl text-blueGray-600 dark:text-blueGray-200 font-bold">
                Comments
              </div>
            </div>
              {/* <div className="flex flex-col space-y-2">
                <div className="font-black uppercase tracking-wider text-lightBlue-600 dark:text-blue-400">
                </div>
                <div className="text-2xl text-blueGray-600 dark:text-white font-bold text-right">
                </div>
              </div> */}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 lg:px-16 py-8">
        {/* <div className="text-lg lg:text-3xl text-blueGray-600 dark:text-blueGray-200 font-bold">
            "{forums?.question}"
        </div> */}
        <div className="lg:grid lg:grid-rows-1 lg:grid-cols-8 bg-white dark:bg-blueGray-900 border-4 rounded-md border-blueGray-300 dark:border-blueGray-100">
          <div className="col-span-9 text-blueGray-800 dark:text-blueGray-100 font-medium flex flex-col space-y-px bg-white dark:bg-blueGray-600">     
            <div className={`flex items-center p-6 relative border-t-2 transition ease-in-out duration-200 }`}>
              <div className="flex-1 flex items-center">
                  <div>
                      <div className="font-bold pb-2 text-lightBlue-600 dark:text-blue-400 mb-2">
                        {formatName(forums?.students?.name ?? "")} {" / "} {forums?.classes?.kelas}
                      </div>
                      <div className="font-semibold text-sm text-justify pr-6">
                        {forums?.question}
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="container mx-auto px-6 lg:px-16 font-black uppercase text-xs lg:text-base tracking-wider text-lightBlue-600 dark:text-blue-400 mt-8 mb-2"> */}
      <div className="flex items-center mt-12 mb-6">
        <div className="flex-1 text-center">
          <div className="font-black uppercase text-xs lg:text-base tracking-wider text-lightBlue-600 dark:text-blue-400">
            comments
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 lg:px-16">
        <div className="lg:grid lg:grid-rows-1 lg:grid-cols-8 bg-white dark:bg-blueGray-900 border rounded-md border-blueGray-300 dark:border-blueGray-900">
          <div className="col-span-9 text-blueGray-800 dark:text-blueGray-100 font-medium flex flex-col space-y-px bg-white dark:bg-blueGray-800">     
            {commentList?.map((v) => {
              return(
                <div className={`flex items-center p-6 relative border-t-2 dark:border-blue-600 dark:bg-blueGray-900 transition ease-in-out duration-200 }`}>
                  <div className="flex-1 flex items-center">
                    <div>
                      <div>
                        {forums?.id === v.forum_id ? 
                          <>
                            <div className="font-bold text-lightBlue-600 dark:text-blue-400">
                              {formatName(v.students?.name ?? "")}
                            </div>
                            <div className="font-normal text-sm text-justify pr-6">
                              {v.answer}
                            </div>
                          </>
                        : null}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <form
        // onSubmit={(e) => {
        //   e.preventDefault();
        //   if (user?.id) {
        //     // onUpdate();
        //     onCreate();
        //   }
        // }}
        className="flex space-x-16"
      >
        <div className="container mx-auto px-6 lg:px-16 py-8">
          <div className="bg-white dark:bg-blueGray-900 border rounded-md border-blueGray-300 dark:border-blueGray-900">
            <div className="py-4 px-4 font-medium flex flex-col space-y-px">
              <TextArea
                className="text-blueGray-600 dark:text-blueGray-200"
                placeholder="Text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div className="py-2 px-4 lg:grid lg:grid-rows-1 lg:grid-cols-12">
              <Button
                // onClick={() => {setRefresh(true)}}
                disabled={
                  !question
                }
                className="col-span-2"
              >
                <i className="fas fa-undo" />Send
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};


export default ForumDetail;