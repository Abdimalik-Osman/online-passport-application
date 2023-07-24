import React from "react";
import { Redirect } from "react-router-dom";

//Dashboard
import DashboardEcommerce from "../pages/DashboardEcommerce";

//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";

// User Profile
import UserProfile from "../pages/Authentication/user-profile";
import UserRole from "../pages/UserRoles";
import EmployeeRegistration from "../pages/Employee";
import CreateUser from "../pages/CreateUser/index";
import CreateApplicant from "../pages/CreateNewApplicant";
import ApproveApplicants from "../pages/ApproveApplicants";
import UnApprovedApplicants from "../pages/UnApproved";
import ApprovedApplicants from "../pages/Approved";
import RegisterHolydays from "../pages/RegisterHolyday";
import ApplicantImage from "../pages/applicantImage";
import CancelAppointment from "../pages/CancelAppointment";

const authProtectedRoutes = [
  
  { path: "/dashboard", component: DashboardEcommerce },
  { path: "/index", component: DashboardEcommerce },
  { path: "/UserRole", component: UserRole },
  { path: "/CreateEmployee", component: EmployeeRegistration },
  { path: "/approve", component: ApproveApplicants },
  { path: "/UnApproved", component: UnApprovedApplicants },
  { path: "/Approved", component: ApprovedApplicants },
  { path: "/Holydays", component: RegisterHolydays },
  { path: "/register", component: CreateUser },
  { path: "/new", component: CreateApplicant },
  { path: "/image", component: ApplicantImage },
  { path: "/cancel", component: CancelAppointment },

  
  //User Profile
  { path: "/profile", component: UserProfile },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/dashboard" />,
  },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPasswordPage },
  // { path: "/register", component: Register },
 
  
];

export { authProtectedRoutes, publicRoutes };