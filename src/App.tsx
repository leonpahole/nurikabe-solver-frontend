import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Editor from "./pages/Editor";
import FirstPage from "./pages/FirstPage";
import ViewSolution from "./pages/ViewSolution";

const App: React.FC<{}> = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/editor">
            <Editor />
          </Route>
          <Route path="/solution">
            <ViewSolution />
          </Route>
          <Route path="/">
            <FirstPage />
          </Route>
        </Switch>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;
