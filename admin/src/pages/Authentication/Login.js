import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  Form,
  FormFeedback,
  Alert,
} from "reactstrap";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//redux
import { useSelector, useDispatch } from "react-redux";

import { withRouter, Link, useHistory } from "react-router-dom";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

//Social Media Imports
import { GoogleLogin } from "react-google-login";
// import TwitterLogin from "react-twitter-auth"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
// actions
import { socialLogin, resetLoginFlag } from "../../store/actions";

import logoLight from "../../assets/images/logo-light.png";
//Import config
import { facebook, google } from "../../config";
import { LoginContext } from "./../../Components/Context/loginContext/LoginContext";
//import images

const Login = (props) => {
  const {
    loginUser,
    User,
   isLoading
  } = useContext(LoginContext);
  const [thUser, setUser] = useState(User);
  // console.log(User?.user?._id);
  if (User?.status == "success") {
    setTimeout(() => {
      // fetchSidebarMenus(User?.user?._id);
      history.push("/dashboard");
    }, 3000);
  }

  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({
    user: state.Account.user,
  }));
  const [userLogin, setUserLogin] = useState([]);
  // useEffect(() => {
  //   if (user && user) {
  //     setUserLogin({
  //       email: user.user.email,
  //       password: user.user.confirm_password,
  //     });
  //   }
  // }, [user]);

  const handlerSubmit = () => {
    console.log(User);
  };
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      loginUser(values);
      // console.log(User);

      if (User?.status == "success") {
        setTimeout(() => {
          history.push("/dashboard");
        }, 2000);
      }
    },
  });

  const { error } = useSelector((state) => ({
    error: state.Login.error,
  }));

  const signIn = (res, type) => {
    if (type === "google" && res) {
      const postData = {
        name: res.profileObj.name,
        email: res.profileObj.email,
        token: res.tokenObj.access_token,
        idToken: res.tokenId,
      };
      dispatch(socialLogin(postData, props.history, type));
    } else if (type === "facebook" && res) {
      const postData = {
        name: res.name,
        email: res.email,
        token: res.accessToken,
        idToken: res.tokenId,
      };
      dispatch(socialLogin(postData, props.history, type));
    }
  };

  //handleGoogleLoginResponse
  const googleResponse = (response) => {
    signIn(response, "google");
  };

  //handleTwitterLoginResponse
  // const twitterResponse = e => {}

  //handleFacebookLoginResponse
  const facebookResponse = (response) => {
    signIn(response, "facebook");
  };

  useEffect(() => {
    // console.log("please navigate");
    // if (User) {
    //   console.log("please navigate");
    //   history.push("/dashboard");
    // }
  }, []);
  useEffect(() => {
    setTimeout(() => {
      dispatch(resetLoginFlag());
    }, 1700);
  }, [dispatch, error]);

  document.title = "Somali Online Passport Application";
  return (
    <React.Fragment>
      <ParticlesAuth>
        <div className="auth-page-content">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <div>
                    <Link to="/" className="d-inline-block auth-logo">
                      {/* <img src={logoLight} alt="" height="20" /> */}
                      <h4>Somali Online Passport Application</h4>
                    </Link>
                  </div>
                  <p className="mt-3 fs-15 fw-medium">Somali Online Passport Application</p>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="mt-4">
                  <CardBody className="p-4">
                    <div className="text-center mt-2">
                      <ToastContainer />
                      <h5 className="text-primary">Welcome Back !</h5>
                      <p className="text-muted">Login in to continue.</p>
                    </div>
                    {error && error ? (
                      <Alert color="danger"> {error} </Alert>
                    ) : null}
                    <div className="p-2 mt-4">
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                        action="#"
                      >
                        <div className="mb-3">
                          <Label htmlFor="email" className="form-label">
                            Username
                          </Label>
                          <Input
                            name="username"
                            className="form-control"
                            placeholder="Enter Username"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.username || ""}
                            invalid={
                              validation.touched.username &&
                              validation.errors.username
                                ? true
                                : false
                            }
                          />
                          {validation.touched.username &&
                          validation.errors.username ? (
                            <FormFeedback type="invalid">
                              {validation.errors.username}
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Label
                            className="form-label"
                            htmlFor="password-input"
                          >
                            Password
                          </Label>
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <Input
                              name="password"
                              value={validation.values.password || ""}
                              type="password"
                              className="form-control pe-5"
                              placeholder="Enter Password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={
                                validation.touched.password &&
                                validation.errors.password
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.password &&
                            validation.errors.password ? (
                              <FormFeedback type="invalid">
                                {validation.errors.password}
                              </FormFeedback>
                            ) : null}
                            {/* <button
                              className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                              type="button"
                              id="password-addon"
                            >
                              <i className="ri-eye-fill align-middle"></i>
                            </button> */}
                          </div>
                        </div>

                        <div className="mt-4">
                          <Button
                            color="success"
                            className="btn btn-success w-100"
                            type="submit"
                            disabled={isLoading}
                          >
                             {isLoading ? "Loading..." : "Login"}
                          </Button>
                        </div>

                        {/* <div className="mt-4 text-center">
                          <div className="signin-other-title">
                            <h5 className="fs-13 mb-4 title">Sign In with</h5>
                          </div>
                          <div>
                            <FacebookLogin
                              appId={facebook.APP_ID}
                              autoLoad={false}
                              callback={facebookResponse}
                              render={(renderProps) => (
                                <Button
                                  color="primary"
                                  className="btn-icon me-1"
                                  onClick={renderProps.onClick}
                                >
                                  <i className="ri-facebook-fill fs-16" />
                                </Button>
                              )}
                            />
                            <GoogleLogin
                              clientId={
                                google.CLIENT_ID ? google.CLIENT_ID : ""
                              }
                              render={(renderProps) => (
                                <Button
                                  color="danger"
                                  to="#"
                                  className="btn-icon me-1"
                                  onClick={renderProps.onClick}
                                >
                                  <i className="ri-google-fill fs-16" />
                                </Button>
                              )}
                              onSuccess={googleResponse}
                              onFailure={() => {}}
                            />
                            <Button color="dark" className="btn-icon">
                              <i className="ri-github-fill fs-16"></i>
                            </Button>{" "}
                            <Button color="info" className="btn-icon">
                              <i className="ri-twitter-fill fs-16"></i>
                            </Button>
                          </div> */}
                        {/* </div> */}
                      </Form>
                    </div>
                  </CardBody>
                </Card>

                {/* <div className="mt-4 text-center">
                  <p className="mb-0">
                    Don't have an account ?{" "}
                    <Link
                      to="/register"
                      className="fw-semibold text-primary text-decoration-underline"
                    >
                      {" "}
                      Signup{" "}
                    </Link>{" "}
                  </p>
                </div> */}
              </Col>
            </Row>
          </Container>
        </div>
      </ParticlesAuth>
    </React.Fragment>
  );
};

export default withRouter(Login);
