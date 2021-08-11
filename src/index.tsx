import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import { Provider as ReduxProvider, useSelector } from "react-redux";
import { RootState, store } from "./redux/store";
import reportWebVitals from "./reportWebVitals";

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
import ProtectedRoute from "./components/ProtectedRoute";

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
  const token = useSelector((state: RootState) => state.auth.token);

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return (
    <BrowserRouter>
      <Switch>
        {process.env.REACT_APP_ENV === "DEV" ? (
          <Route
            path="/vlab/___dummy-login___"
            exact
            render={() => <DummyLogin />}
          />
        ) : null}

        <Route path="/vlab/load" exact render={() => <Loader />} />

        <ProtectedRoute
          path="/vlab/"
          component={() => (
            <Layout>
              <Switch>
                <Route path="/vlab/home" exact component={Homepage} />
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

                <Route
                  path="*"
                  component={() => {
                    return <Redirect to="/vlab/home" />;
                  }}
                />
              </Switch>
            </Layout>
          )}
        />

        <Route
          path="*"
          render={() => {
            return <Redirect to="/vlab/load" />;
          }}
        />
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
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
