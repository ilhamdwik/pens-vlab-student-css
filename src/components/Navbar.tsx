/* eslint-disable @typescript-eslint/no-unused-vars */
import { Popover, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import React, { Fragment } from "react";
import { ReactComponent as LogoText } from "../assets/images/logo-text.svg";
import { formatName } from "../utils/formatter";
import { RootState } from "../redux/store";
import { connect, useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../redux/actions/appActions";
import { PayloadAction } from "typesafe-actions";
import { CourseMenu } from "./CourseMenu";
import { useCookies } from "react-cookie";
import { SwipeableDrawer } from "@material-ui/core";
import { Button } from "./Button";
import { setToken, setUser } from "../redux/actions/authActions";

export const Navbar = ({
  dark,
  toggleDarkMode,
}: {
  dark?: boolean;
  toggleDarkMode: (dark: boolean) => PayloadAction<"TOGGLE_DARK_MODE", boolean>;
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [, , removeCookie] = useCookies(["vlabToken", "user"]);
  const [openSidebar, setOpenSidebar] = React.useState(false);

  const onLogout = () => {
    dispatch(setToken());
    dispatch(setUser());
    localStorage.removeItem("userCas");
    document.location.href = "https://ethol.pens.ac.id";
  };

  return (
    <header className="z-50 bg-white dark:bg-blueGray-900 w-full flex justify-center flex-col fixed shadow h-16">
      <SwipeableDrawer
        anchor="right"
        open={openSidebar}
        onClose={() => setOpenSidebar(false)}
        onOpen={() => setOpenSidebar(true)}
      >
        <div className="w-screen py-4 px-6 h-screen overflow-y-auto scrollbar-thin">
          <div className="flex justify-end items-center">
            <div
              className="lg:hidden p-2 flex items-center justify-center rounded border border-blue-600 dark:border-blueGray-800 cursor-pointer"
              onClick={() => setOpenSidebar(false)}
            >
              <i className="fas fa-times text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div>
            <div className="cursor-pointer flex space-x-4 items-center focus:outline-none my-4">
              <img
                src="https://ethol.pens.ac.id/api/images/user.png"
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="text-left">
                <div className="font-medium text-blueGray-800 dark:text-blueGray-100">
                  {formatName(user?.name ?? "")}
                </div>
                <div className="text-blueGray-400 text-xs mt-0.5">
                  {user?.nrp}
                </div>
              </div>
            </div>
            <Button
              onClick={() => {
                document.location.href = "https://ethol.pens.ac.id";
              }}
              className="w-full "
            >
              Kembali ke ETHOL
            </Button>
            <Button
              onClick={() => {
                onLogout();
              }}
              className="w-full mt-2"
            >
              Logout
            </Button>
          </div>
          <div className="my-8" />
          <div className="flex flex-col">
            <Link
              to=""
              className="px-0 py-4 font-bold text-blue-600 border-b border-blueGray-200"
              onClick={() => {
                setOpenSidebar(false);
              }}
            >
              Beranda
            </Link>
            <Link
              to="/courses"
              className="px-0 py-4 font-bold text-blue-600 border-b border-blueGray-200"
              onClick={() => {
                setOpenSidebar(false);
              }}
            >
              Course
            </Link>
            <Link
              to="/quiz"
              className="px-0 py-4 font-bold text-blue-600 border-b border-blueGray-200"
              onClick={() => {
                setOpenSidebar(false);
              }}
            >
              Kuis
            </Link>
            <Link
              to="/playground"
              className="px-0 py-4 font-bold text-blue-600 border-b border-blueGray-200"
              onClick={() => {
                setOpenSidebar(false);
              }}
            >
              Playground
            </Link>
          </div>
        </div>
      </SwipeableDrawer>
      <nav className="container mx-auto px-6 lg:px-16 flex items-center">
        <Link to="">
          <LogoText className="w-32 h-10 lg:w-40 lg:h-12" />
        </Link>
        <div className="flex-1 lg:hidden" />
        <button
          onClick={() => {
            toggleDarkMode(!dark);
          }}
          className="focus:outline-none mr-6 lg:hidden"
        >
          {dark ? (
            <i className="fas fa-sun text-lg text-white" />
          ) : (
            <i className="fas fa-moon text-lg text-lightBlue-800" />
          )}
        </button>
        <div
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded border border-blue-600 dark:border-blueGray-800 cursor-pointer"
          onClick={() => setOpenSidebar(true)}
        >
          <i className="fas fa-bars text-blue-600 dark:text-blue-400 " />
        </div>
        <div className="hidden lg:flex flex-1 space-x-10 mx-10">
          <div className="flex-1" />
          <Link
            to=""
            className="flex items-center space-x-2 text-blueGray-800 dark:text-blueGray-100 hover:text-blue-600 transition focus:outline-none font-medium"
          >
            <span>Beranda</span>
          </Link>
          <CourseMenu />
          <Link
            to="/quiz"
            className="flex items-center space-x-2 text-blueGray-800 dark:text-blueGray-100 hover:text-blue-600 transition focus:outline-none font-medium"
          >
            <span>Kuis</span>
          </Link>
          <Link
            to="/playground"
            className="flex items-center space-x-2 text-blueGray-800 dark:text-blueGray-100 hover:text-blue-600 transition focus:outline-none font-medium"
          >
            <span>Playground</span>
          </Link>
          <Link
            to="/playground_full"
            className="flex items-center space-x-2 text-blueGray-800 dark:text-blueGray-100 hover:text-blue-600 transition focus:outline-none font-medium"
          >
            <span>Playground Full</span>
          </Link>
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button className="cursor-pointer flex space-x-4 items-center focus:outline-none ml-4">
                  <img
                    src={`https://avatars.dicebear.com/api/initials/${user?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}.svg?backgroundColors[]=blue`}
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="text-left">
                    <div className="font-medium text-blueGray-800 dark:text-blueGray-100">
                      {formatName(user?.name ?? "")}
                    </div>
                    <div className="text-blueGray-400 text-xs mt-0.5">
                      {user?.nrp}
                    </div>
                  </div>
                  <i
                    className={`fas fa-chevron-down text-blueGray-800 dark:text-blueGray-100 text-xs transition duration-200 transform ${
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
                  <Popover.Panel className="absolute right-0 z-10 px-4 mt-2 sm:px-0 ">
                    <>
                      <i className="absolute right-12 fas fa-caret-up text-4xl text-white dark:text-blueGray-900" />
                      <div
                        className="overflow-hidden shadow-md rounded-lg mt-6 bg-white dark:bg-blueGray-900 flex flex-col dark:text-blueGray-100"
                        style={{ maxHeight: "500px" }}
                      >
                        <a href="https://ethol.pens.ac.id">
                          <div className="p-4 pr-16 relative cursor-pointer hover:bg-blue-100 dark:hover:bg-blueGray-800 hover:text-blue-800 dark:hover:text-blue-400 transition ease-in-out duration-200 ">
                            Kembali ke ETHOL
                          </div>
                        </a>
                        <div
                          onClick={onLogout}
                          className="p-4 pr-16 relative cursor-pointer hover:bg-blue-100 dark:hover:bg-blueGray-800 hover:text-blue-800 dark:hover:text-blue-400 transition ease-in-out duration-200 "
                        >
                          Keluar
                        </div>
                      </div>
                    </>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
          <button
            onClick={() => {
              toggleDarkMode(!dark);
            }}
            className="focus:outline-none"
          >
            {dark ? (
              <i className="fas fa-sun text-lg text-white" />
            ) : (
              <i className="fas fa-moon text-lg text-lightBlue-800" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

const mapStateToProps = (state: RootState) => ({
  dark: state.app.dark,
});

const mapDispatchToProps = {
  toggleDarkMode,
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
