import React, { useContext, useEffect } from "react";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
// import { LoginContex } from "../../context/loginContext/LoginContext";
// import AppLogout from "../Authentication/AppLogout";
import CountUp from "react-countup";
import Flatpickr from "react-flatpickr";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row
} from "reactstrap";
import { LoginContext } from './../../Components/Context/loginContext/LoginContext';

const DashboardEcommerce = () => {
  const {
    fetchMonthlyApplicants, fetchDailyApplicants,monthlyApplicants,dailyApplicants,
    isLoading,fetchUnapprovedApplicants,unapprovedApplicants,fetchEmployees,
    getEmployees

  } = useContext(LoginContext);
  document.title = "Dashboard";
  // const {
  //   User,
  //   fetchSidebarMenus,
  //   customers,
  //   fetchCustomers,
  //   expireCards,
  //   FetchExpireCards,
  //   allUsers,
  //   getAllUsers,
  //   fetchtodaysTickets,
  //   todaysTikcets,
  //   fetchTopTenLastLoginUsers,
  //   topTenUsers,
  //   fetchSingleRoleReport,repRoles
  // } = useContext(LoginContex);
  // let userId = User?.data?.user?._id || User?.user?._id;
  // useEffect(() => {
  //   fetchSidebarMenus(User?.user?._id);
  //   fetchCustomers();
  //   FetchExpireCards();
  //   getAllUsers();
  //   fetchtodaysTickets();
  //   fetchTopTenLastLoginUsers();
  //   fetchSidebarMenus(userId);
  //   fetchSingleRoleReport(userId);
  // }, []);

  // console.log(User?.user?._id);
  // console.log(allUsers);
  // console.log(todaysTikcets);
  // console.log(topTenUsers);

  // console.log(repRoles)
  // const activeUsers = allUsers.filter((user) => {
  //   return user.userStatus == "Active";
  // });
  const myItemString = localStorage.getItem('user');
  const user = JSON.parse(myItemString);
  const district = user?.data.districtId;
  const userId1 = user?.data._id;
  const data = {
    districtId:district,
    userId:userId1
  }
  useEffect(() => {
    fetchMonthlyApplicants(userId1)
    fetchDailyApplicants(userId1)
    fetchUnapprovedApplicants(data)
    fetchEmployees()
  }, []);
  const widgets = [
    {
      id: 1,
      cardColor: "success",
      label: "Monthly Applicants Applicants",
      badge: "ri-arrow-right-up-line",
      badgeClass: "success",
      // percentage: "+29.08",
      counter: monthlyApplicants?.length,
      link: "See details",
      bgcolor: "warning",
      icon: "bx bx-user-circle",
      decimals: 0,
      prefix: "",
      suffix: "",
    },

    {
      id: 2,
      cardColor: "secondary",
      label: "Un Approved Applicants",
      badge: "ri-arrow-right-down-line",
      badgeClass: "danger",
      percentage: "-3.57",
      counter: unapprovedApplicants?.length,
      link: "View all orders",
      bgcolor: "info",
      icon: " bx bx-tv",
      decimals: 0,
      prefix: "",
      separator: ",",
      suffix: "",
    },
    {
      id: 2,
      cardColor: "secondary",
      label: "Today's Applicants",
      badge: "ri-arrow-right-down-line",
      badgeClass: "danger",
      percentage: "-3.57",
      counter: dailyApplicants?.length,
      link: "View all orders",
      bgcolor: "info",
      icon: " bx bx-alarm-off",
      decimals: 0,
      prefix: "",
      separator: ",",
      suffix: "",
    },

    {
      id: 3,
      cardColor: "secondary",
      label: "Total Employees",
      badge: "ri-arrow-right-down-line",
      badgeClass: "danger",
      percentage: "-3.57",
      counter: getEmployees?.length,
      link: "View all orders",
      bgcolor: "info",
      icon: "bx bx-message-alt",
      decimals: 0,
      prefix: "",
      separator: ",",
      suffix: "",
    },
  ];
  return (
    <React.Fragment>
      
        <div className="page-content">
          <Container fluid>
            <BreadCrumb title="Dashboard" pageTitle="Dashboards" />
            <Row className="mb-3 pb-1">
              <Col xs={12}>
                <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                  <div className="flex-grow-1">
                    <h4 className="fs-16 mb-1">Welcome !</h4>
                    <p className="text-muted mb-0">
                      Here's what's happening today.
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              {widgets.map((item, key) => (
                <Col xl={3} md={6} key={key}>
                  <Card className="card-animate">
                    <CardBody>
                      <div className="d-flex align-items-center">
                        <div className="flex-grow-1 overflow-hidden">
                          <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                            {item.label}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <h5 className={"fs-14 mb-0 text-" + item.badgeClass}>
                            {/* {item.badge ? <i className={"fs-13 align-middle " + item.badge}></i> : null} {item.percentage} % */}
                          </h5>
                        </div>
                      </div>
                      <Row>
                        <div className="d-flex align-items-end justify-content-between mt-4">
                          <div>
                            <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                              <span
                                className="counter-value"
                                data-target="559.25"
                              >
                                <CountUp
                                  start={0}
                                  prefix={item.prefix}
                                  suffix={item.suffix}
                                  separator={item.separator}
                                  end={item.counter}
                                  decimals={item.decimals}
                                  duration={4}
                                />
                              </span>
                            </h4>
                          </div>
                          <div className="avatar-sm flex-shrink-0">
                            <span
                              className={
                                "avatar-title rounded fs-3 bg-soft-" +
                                item.bgcolor
                              }
                            >
                              <i
                                className={`text-${item.bgcolor} ${item.icon}`}
                              ></i>
                            </span>
                          </div>
                        </div>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
            <Row>
              <Col xl={6}>
                <Card>
                  <CardHeader className="align-items-center d-flex">
                    <h4 className="card-title mb-0 flex-grow-1">
                      Logged in Users
                    </h4>
                  </CardHeader>

                  <CardBody>
                    <div className="table-responsive table-card">
                      <table className="table table-borderless table-hover table-nowrap align-middle mb-0">
                        <thead className="table-light">
                          <tr className="text-muted">
                            <th scope="col">Name</th>
                            <th scope="col">UserName</th>
                            <th scope="col">Login Time</th>
                            <th scope="col">Status</th>
                          </tr>
                        </thead>

                        
                      </table>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col xl={6}>
                <div className="card">
                  <div className="card-header border-0">
                    <h4 className="card-title mb-0">Calendar</h4>
                  </div>
                  <div className="card-body pt-0">
                    <div className="upcoming-scheduled">
                      <Flatpickr
                        className="form-control"
                        options={{
                          dateFormat: "d M, Y",
                          inline: true,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      
    </React.Fragment>
  );
};

export default DashboardEcommerce;
