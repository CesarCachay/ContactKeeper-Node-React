import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../context/alert/AlertContext";
import AuthContext from "../context/auth/AuthContext";

const Login = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { loginUser, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error === "Invalid user" || error === "Invalid password") {
      setAlert(error, "warning");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const { email, password } = user;

  const loginChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginSubmit = e => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please fill in all fields", "danger");
    } else {
      loginUser({
        email,
        password
      });
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={loginSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={loginChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={loginChange}
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Login;
