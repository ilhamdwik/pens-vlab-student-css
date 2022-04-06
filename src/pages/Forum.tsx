/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Swal from "sweetalert2";
import { forums } from "../types";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import nProgress from "nprogress";
import { 
  getAllForums,
  postCreateForum,
  deleteForum,
} from "../redux/actions/forumActions";
import TextArea from "../components/TextArea";
import Button from "../components/Button";
import moment from "moment";
import { useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import { toast } from "react-toastify";
import { useHistory } from 'react-router';
import { formatName } from "../utils/formatter";
// import forum from "../redux/sagas/forums";

export const Forum = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const [forumList, setForumList] = React.useState<forums[]>([]);
  const [question, setQuestion] = React.useState("");
  const [loading, setLoading] = React.useState(id ? true : false);

  React.useEffect(() => {
    nProgress.start();
    dispatch(
      getAllForums.request({
        onSuccess: (res) => {
          setForumList(res);
          nProgress.done();
        },
        onFailure: (err) => {},
      })
    );

    return () => {
      // nProgress.done();
    };
  }, []);

  const onCreate = () => {
    // nProgress.start();
    // setLoading(true);
    dispatch(
      postCreateForum.request({
        data: {
          author_id: user?.id ?? "",
          class_id: user?.class_id ?? "",
          question,
        },
        onSuccess: () => {
          nProgress.done();
          setLoading(false);
          toast.success("Forum berhasil ditambahkan");
          history.go(0);
        },
        onFailure: () => {
          nProgress.done();
          setLoading(false);
        }
      })
    );
  };

  const onDelete = (id: string) => {
    Swal.fire({
      title: "Hapus Data ?",
      text: "Apakah anda yakin menghapus data ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Hapus`,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        dispatch(
          deleteForum.request({
            id: id,
            onSuccess: () => {
              toast.success("Data berhasil dihapus");
              history.go(0);
            },
            onFailure: (err) => ({}),
          })
        );
      }
    });
  };
// var words = "ilham";
// var result = words.substring(0, 3) + "xxxxxxx";
  return (
    <div className="" style={{ minHeight: "80vh" }}>
      <div
        style={{}}
      >
        <div className="mx-auto px-32 py-8 lg:py-12 flex justify-center items-center bg-gradient-to-l from-blueGray-300 to-blueGray-50 dark:from-blueGray-900 dark:to-lightBlue-900">
          <div className="flex items-center space-x-8">
            <div className="flex-1 text-center">
              <div className="font-black uppercase text-xs lg:text-base tracking-wider text-lightBlue-600 dark:text-blue-400 mb-2">
                Forum
              </div>
              <div className="text-lg lg:text-3xl text-blueGray-600 dark:text-blueGray-200 font-bold">
                Mahasiswa
              </div>
            </div>
              <div className="flex flex-col space-y-2">
                <div className="font-black uppercase tracking-wider text-lightBlue-600 dark:text-blue-400">
                  {/* <Link
                    to={``}
                  >
                    <Button>New Chat</Button>
                  </Link> */}
                </div>
                <div className="text-2xl text-blueGray-600 dark:text-white font-bold text-right">
                  {/* {quiz?.score ?? "-"} */}
                </div>
              </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 lg:px-16 py-8">
        <div className="lg:grid lg:grid-rows-1 lg:grid-cols-8 bg-white dark:bg-blueGray-900 border rounded-md border-blueGray-300 dark:border-blueGray-900">
          <div className="col-span-9 text-blueGray-800 dark:text-blueGray-100 font-medium flex flex-col space-y-px bg-white dark:bg-blueGray-800">     
            {forumList?.map((v) => {
              return (
                <>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (user?.id) {
                      onDelete(v.id)
                    }
                  }}
                >
                  <div className={`flex items-center p-6 relative border-t-2 dark:border-blue-600 dark:bg-blueGray-900 transition ease-in-out duration-200 }`}>
                    <div className="flex-1 flex items-center">
                      <div>
                        <div className="font-bold text-lightBlue-600 dark:text-blue-400 pb-2">
                          {formatName(v.students?.name ?? "")} {" / "} {v.classes?.kelas}
                        </div>
                        <div className="font-bold">
                          
                        </div>
                        <div className="font-normal text-sm text-justify pr-6">
                          {v.question}
                        </div>
                      </div>
                    </div>
                    <Link
                      key={v.id}
                      to={`/forum/${v.id}`}
                    >
                      <span className="py-1 inline-flex font-semibold rounded-full text-blue-800 dark:text-blueGray-100 hover:text-blue-600 dark:hover:text-blue-400 transition focus:outline-none">
                        {/* {v.comments?} */}
                        {/* {forumList.length} */}
                        <i className="px-2">
                            <FontAwesomeIcon icon={faComments} />
                        </i>
                      </span>
                    </Link>
                    <span className="px-3 py-1 inline-flex font-semibold rounded-full bg-blueGray-300 dark:bg-lightBlue-900 text-blue-800 dark:text-blueGray-100">
                      {moment(v.createdAt).format(
                        "HH:mm, DD MMMM YYYY"
                      )}
                    </span>
                    {user?.id === v.author_id ? (
                      <Button
                        className="ml-2"
                      >
                        <i className="fas fa-trash" />
                      </Button>
                    ) : (
                      <Button
                        disabled
                        className="ml-2"
                      >
                        <i className="fas fa-trash" />
                      </Button>
                    )}
                  </div>
                </form>
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
                  !question || 
                  loading
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

export default Forum;
