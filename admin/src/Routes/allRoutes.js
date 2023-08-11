import React from "react";
import { Redirect } from "react-router-dom";

//Dashboard
import DashboardEcommerce from "../pages/DashboardEcommerce";

//login
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";

// User Profile
import ApproveApplicants from "../pages/ApproveApplicants";
import ApprovedApplicants from "../pages/Approved";
import UserProfile from "../pages/Authentication/user-profile";
import CancelAppointment from "../pages/CancelAppointment";
import CreateApplicant from "../pages/CreateNewApplicant";
import CreateUser from "../pages/CreateUser/index";
import DailyApplicants from "../pages/DailyApplicants";
import EmployeeRegistration from "../pages/Employee";
import MonthlyApplicants from "../pages/MonthlyApplicants";
import RegisterHolydays from "../pages/RegisterHolyday";
import UnApprovedApplicants from "../pages/UnApproved";
import UserRole from "../pages/UserRoles";
import ApplicantImage from "../pages/applicantImage";
import ScanFinger from './../pages/Scanfinger/index';

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
  { path: "/scan", component: ScanFinger },
  { path: "/daily", component: DailyApplicants },
  { path: "/monthly", component: MonthlyApplicants },

  
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
  // { path: "/cancel", component: CancelAppointment },
  // { path: "/register", component: Register },
 
  
];

export { authProtectedRoutes, publicRoutes };
