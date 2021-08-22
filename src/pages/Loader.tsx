/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useCookies } from "react-cookie";
import { motion, useAnimation } from "framer-motion";
import { ControlsAnimationDefinition } from "framer-motion/types/animation/types";
import { Modal } from "../components/Modal";
import axios from "axios";
import {
  fetchEtholUserDetail,
  fetchUserCheck,
  setToken,
} from "../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "../redux/store";

export const Loader = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const history = useHistory();
  const controls = useAnimation();
  const [cookies] = useCookies(["token"]);
  const [showModal, setShowModal] = React.useState(false);

  const initialAnimation: ControlsAnimationDefinition = (i) => ({
    pathLength: 1,
    fill: "rgba(96, 165, 250, 1)",
    transition: {
      default: { duration: 2, ease: "linear", delay: i * 2 },
      fill: { duration: 3, ease: [1, 0, 0.8, 1], delay: i * 2 },
    },
  });

  const repeatAnimation: ControlsAnimationDefinition = () => ({
    pathLength: 0,
    fill: "rgba(96, 165, 250, 0)",
    transition: {
      fill: { duration: 2, ease: [1, 0, 0.8, 1] },
    },
  });

  React.useEffect(() => {
    controls.start(initialAnimation);
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      history.replace("");
    }
  }, []);

  const checkAuth = () => {
    if (!token) {
      if (cookies.token) {
        dispatch(
          fetchEtholUserDetail.request({
            token: cookies.token,
            onFailure: () => {
              setShowModal(true);
            },
            onSuccess: (userDetail) => {
              dispatch(
                fetchUserCheck.request({
                  data: {
                    token: cookies.token,
                    userDetail,
                  },
                  onFailure: () => {
                    setShowModal(true);
                  },
                  onSuccess: (token: string) => {
                    dispatch(setToken(token));
                    axios.defaults.headers.common[
                      "Authorization"
                    ] = `Bearer ${token}`;
                    history.replace("/home");
                  },
                })
              );
            },
          })
        );
      } else {
        // if there is no "user" cookie from ETHOL
        setShowModal(true);

        axios.defaults.headers.common["Authorization"] = undefined;
      }
    }
  };

  return (
    <div className="bg-blue-50 w-screen h-screen flex flex-col justify-center items-center">
      <Modal
        open={showModal}
        title="Error"
        content="Login gagal, pastikan anda sudah login ke ETHOL"
        buttons={[
          { text: "OK" },
          {
            text: "Coba Lagi",
            onClick: () => {
              setShowModal(false);
              controls.start(initialAnimation);
            },
          },
        ]}
        onClose={() => {
          document.location.href = "https://ethol.pens.ac.id";
        }}
      />
      <div className="w-32 h-32 p-6 bg-white rounded-2xl shadow-2xl">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="item"
        >
          <motion.path
            custom={0}
            animate={controls}
            d="M35.38,22.52A9.65,9.65,0,0,1,44.11,17h24a9.64,9.64,0,0,1,8.74,13.71Q61.67,63.32,46.49,95.93a9.58,9.58,0,0,0,0,8.14l30.38,65.24A9.64,9.64,0,0,1,68.13,183h-24a9.65,9.65,0,0,1-8.73-5.54L.91,104.1a9.72,9.72,0,0,1,0-8.2Z"
            stroke="rgba(96, 165, 250, 1)"
            initial={{
              pathLength: 0,
              fill: "rgba(96, 165, 250, 0)",
            }}
            strokeWidth="2"
          />
          <motion.path
            custom={1}
            animate={controls}
            d="M199.09,95.9a9.72,9.72,0,0,1,0,8.2l-34.47,73.38a9.65,9.65,0,0,1-8.73,5.54h-24a9.64,9.64,0,0,1-8.74-13.71l30.38-65.24a9.58,9.58,0,0,0,0-8.14q-15.18-32.62-30.38-65.24A9.64,9.64,0,0,1,131.87,17h24a9.65,9.65,0,0,1,8.73,5.54Z"
            stroke="rgba(96, 165, 250, 1)"
            initial={{
              pathLength: 0,
              fill: "rgba(96, 165, 250, 0)",
            }}
            strokeWidth="2"
            onAnimationComplete={() => {
              //check auth here
              checkAuth();

              if (!showModal) {
                controls.start(repeatAnimation).then(() => {
                  controls.start(initialAnimation);
                });
              }
            }}
          />
        </motion.svg>
      </div>
      <motion.div
        className="mt-6 text-lg font-medium text-blueGray-800"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
      >
        PENS V-Lab
      </motion.div>
    </div>
  );
};

export default Loader;
