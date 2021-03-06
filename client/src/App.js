import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./views/Home";
import About from "./views/About";
import Register from "./views/Register";
import Login from "./views/Login";
import PrivateRoute from "./components/routing/PrivateRoute";

import ContactState from "./context/contact/ContactState";
import AuthContext from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import Alerts from "./components/layout/Alerts";

import setAuthToken from "./utils/SetAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthContext>
      <ContactState>
        <AlertState>
          <Router>
            <>
              <Navbar />
              <div className="container">
                <Alerts />
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </>
          </Router>
        </AlertState>
      </ContactState>
    </AuthContext>
  );
};

export default App;
