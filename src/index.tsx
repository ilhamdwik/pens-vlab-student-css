import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import { useCookies } from "react-cookie";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";
import "./assets/styles/index.css";
import "./assets/styles/nprogress.css";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, Slide } from "react-toastify";

import { Layout } from "./containers/Layout";
// pages
import { Loader } from "./pages/Loader";
import { Homepage } from "./pages/Homepage";
import { Playground } from "./pages/Playground";
import { Courses } from "./pages/Courses";
import { Lesson } from "./pages/Lesson";
import { Quiz } from "./pages/Quiz";
import { QuizDetail } from "./pages/QuizDetail";
import { CourseDetail } from "./pages/CourseDetail";
import axios from "axios";
import DummyLogin from "./pages/DummyLogin";

const contextClass = {
  success: "bg-blue-600",
  error: "bg-red-600",
  info: "bg-gray-600",
  warning: "bg-orange-400",
  default: "bg-indigo-600",
  dark: "bg-white-600 font-gray-300",
};

declare global {
  /*~ Here, declare things that go in the global namespace, or augment
   *~ existing declarations in the global namespace
   */
  interface Error {
    response: {
      data: {
        message: string;
      };
    };
  }
}

export const App = () => {
  const [cookies] = useCookies(["vlabToken"]);

  if (cookies.vlabToken) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${cookies.vlabToken}`;
  }

  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <Switch>
          {/* only use in DEV */}
          <Route path="/vlab/___dummy-login___" exact component={DummyLogin} />
          {cookies.vlabToken ? (
            <>
              <Layout>
                <Switch>
                  <Route path="/vlab" exact component={Homepage} />
                  <Route path="/vlab/playground" exact component={Playground} />
                  <Route path="/vlab/quiz" exact component={Quiz} />
                  <Route path="/vlab/quiz/:id" exact component={QuizDetail} />
                  <Route path="/vlab/courses" exact component={Courses} />
                  <Route
                    path="/vlab/courses/:id"
                    exact
                    component={CourseDetail}
                  />
                  <Route path="/vlab/lesson/:id" exact component={Lesson} />
                  <Redirect to="/vlab" />
                </Switch>
              </Layout>
            </>
          ) : (
            <>
              <Route path="/vlab/load" exact component={Loader} />

              <Redirect to="/vlab/load" />
            </>
          )}
        </Switch>
        <ToastContainer
          transition={Slide}
          autoClose={2000}
          position="bottom-right"
          hideProgressBar
          toastClassName={(prop) =>
            contextClass[prop?.type || "default"] +
            " relative flex p-4 my-4 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
          }
        />
      </BrowserRouter>
    </ReduxProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
