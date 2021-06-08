import React from "react";
import "./Login.css";
import { doLogin, doRegister } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { routes } from "../../routes";
import SnackbarUI from "../SnackbarUI/SnackbarUI";

const Login = () => {
  const [userDetails, setUserDetails] = React.useState({
    email: "",
    password: "",
  });

  const [userRegister, setUserRegister] = React.useState({
    email: "",
    password: "",
    userName: "",
    cnfpassword: "",
  });

  const [isLogin, setIsLogin] = React.useState(true);

  const { login } = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const loginData = { ...userDetails };
    const { name, value } = event.target;
    loginData[name] = value;
    setUserDetails(loginData);
  };

  const handleRegisterChange = (event) => {
    const registerData = { ...userRegister };
    const { name, value } = event.target;
    registerData[name] = value;
    setUserRegister(registerData);
  };

  const handleSignupSubmit = () => {
    if (userRegister.password !== userRegister.cnfpassword)
      return (
        <SnackbarUI
          show={true}
          message="password and confirm password are not equal"
          severity="danger"
        />
      );
    const { email, password, userName } = userRegister;
    dispatch(doRegister({ email, password, userName }));
  };

  const handleLoginSubmit = () => {
    const { email, password } = userDetails;
    dispatch(doLogin({ email, password }));
  };

  const handleToggleClick = () => {
    setIsLogin(!isLogin);
  };

  if (login.authenticated) {
    return <Redirect to={routes.INVENTORY} />;
  }

  return (
    <>
      <header>
        <div className="jumbotron loginFormContainer">
          <div className="container">
            <br />
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6 text-center">
                <div className="text-center">
                  <div className="wrapper">
                    <div className="title-text">
                      <div className="title login">Login Form</div>
                      <div className="title signup">Signup Form</div>
                    </div>
                    <div className="form-container">
                      <div className="slide-controls">
                        <input
                          type="radio"
                          name="slide"
                          id="login"
                          checked={isLogin}
                        />
                        <input
                          type="radio"
                          name="slide"
                          id="signup"
                          checked={!isLogin}
                        />
                        <label
                          htmlFor="login"
                          onClick={handleToggleClick}
                          className="slide login"
                        >
                          &nbsp;Login
                        </label>
                        <label
                          htmlFor="signup"
                          onClick={handleToggleClick}
                          className="slide signup"
                        >
                          Signup
                        </label>
                        <div className="slider-tab"></div>
                      </div>
                      <div className="form-inner">
                        {isLogin ? (
                          <div className="loginForm">
                            <div className="field">
                              <input
                                type="text"
                                onChange={handleChange}
                                name="email"
                                placeholder="Email Address"
                                required
                                value={userDetails.email}
                              />
                            </div>
                            <div className="field">
                              <input
                                type="password"
                                onChange={handleChange}
                                name="password"
                                placeholder="Password"
                                required
                                value={userDetails.password}
                              />
                            </div>
                            <div className="pass-link">
                              <a href="forgotpassword">Forgot password?</a>
                            </div>
                            <div className="field btn">
                              <div className="btn-layer"></div>
                              <input
                                type="submit"
                                onClick={handleLoginSubmit}
                                value="Login"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="signupForm">
                            <div className="field">
                              <input
                                type="text"
                                name="email"
                                placeholder="Email Address"
                                value={userRegister.email}
                                required
                                onChange={handleRegisterChange}
                              />
                            </div>
                            <div className="field">
                              <input
                                type="text"
                                name="userName"
                                value={userRegister.userName}
                                placeholder="Name"
                                required
                                onChange={handleRegisterChange}
                              />
                            </div>
                            <div className="field">
                              <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                value={userRegister.password}
                                required
                                onChange={handleRegisterChange}
                              />
                            </div>
                            <div className="field">
                              <input
                                type="password"
                                name="cnfpassword"
                                value={userRegister.cnfpassword}
                                id="cnfpassword"
                                placeholder="Confirm password"
                                required
                                onChange={handleRegisterChange}
                              />
                            </div>
                            <div className="field btn">
                              <div className="btn-layer"></div>
                              <input
                                type="submit"
                                onClick={handleSignupSubmit}
                                data-action="Signup"
                                value="Signup"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <p>&nbsp;</p>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default Login;
