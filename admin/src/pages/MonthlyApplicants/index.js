import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Row
} from "reactstrap";
// import BreadCrumb from '../../../Components/Common/BreadCrumb';

import { ToastContainer } from "react-toastify";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { LoginContext } from './../../Components/Context/loginContext/LoginContext';

const MonthlyApplicants = () => {
  //LOCAL states
  const myItemString = localStorage.getItem('user');
  const user = JSON.parse(myItemString);
  const district = user?.data.districtId;
  const userId1 = user?.data._id;
  const data = {
    districtId:district,
    userId:userId1
  }
  const [salesAgentName, setsalesAgentName] = useState("");
  const [salesAgentPhone, setsalesAgentPhone] = useState("");
  const [salesAgentAddress, setsalesAgentAddress] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [_id, set_ID] = useState("");
  const {
    fetchMonthlyApplicants, fetchDailyApplicants,monthlyApplicants,dailyApplicants,
    isLoading

  } = useContext(LoginContext);

  const [modal_list, setmodal_list] = useState(false);
  const tog_list = () => {
    setmodal_list(!modal_list);
  };

  const [modal_delete, setmodal_delete] = useState(false);
  const tog_delete = () => {
    setmodal_delete(!modal_delete);
  };

  useEffect(() => {
    fetchMonthlyApplicants(userId1)
  }, []);

  document.title = "Monthly Applicants";
//   let userId = User?.data?.user?._id || User?.user?._id;
//   console.log(auto[0]?.requestBody.billInfo.invoiceId);
//   const columns = useMemo(
//     () => [
//       {
//         Header: "invoiceId",
//         accessor: "requestBody.billInfo.invoiceId",
//         filterable: false,
//       },
//       {
//         Header: "Phone Number",
//         accessor: "salesAgentPhone",
//         filterable: false,
//       },
//       {
//         Header: "Address",
//         accessor: "salesAgentAddress",
//         filterable: false,
//       },
//       {
//         Header: "Action",
//         Cell: (cellProps) => {
//           return (
//             <ul className="list-inline hstack gap-2 mb-0">
//               <li className="list-inline-item edit" title="Edit">
//                 <Link
//                   to="#"
//                   className="text-primary d-inline-block edit-item-btn"
//                   onClick={(row) => {
//                     const customerData = cellProps.row.original;
//                     updateForm(customerData);
//                   }}
//                 >
//                   <i className="ri-pencil-fill fs-16"></i>
//                 </Link>
//               </li>
//               <li className="list-inline-item" title="Remove">
//                 <Link
//                   to="#"
//                   className="text-danger d-inline-block remove-item-btn"
//                   onClick={(row) => {
//                     const customerData = cellProps.row.original;
//                     deleteCus(customerData);
//                   }}
//                 >
//                   <i className="ri-delete-bin-5-fill fs-16"></i>
//                 </Link>
//               </li>
//             </ul>
//           );
//         },
//       },
//     ]
//     // [handleCustomerClick]
//   );

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = monthlyApplicants?.filter(
    (item) =>
      item.fullname &&
      item.fullname.toLowerCase().includes(filterText.toLowerCase())
  );
  console.log(filteredItems);
  console.log(filterText);
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <div>
        <Input
          onChange={(e) => setFilterText(e.target.value)}
          onClear={handleClear}
          filterText={filterText}
          placeholder="search here"
        />
      </div>
    );
  }, [filterText, resetPaginationToggle]);

  document.title = "Channel Package ";
  const columnss = [
    {
      name: <h6 style={{ fontWeight: "bold" }}> Applicant Name</h6>,
      selector: (row) => row?.fullname,
    },

    {
      name: <h6 style={{ fontWeight: "bold" }}> Appointment Time</h6>,
      selector: (row) => row?.appointmentTime,
    },
    {
      name: <h6 style={{ fontWeight: "bold" }}> Appointment Date</h6>,
      selector: (row) =>  moment(row?.appointmentDate).utc().format("DD-MM-YYYY"),
    },
    // {
    //   name: <h6 style={{ fontWeight: "bold" }}> transacionInfo</h6>,
    //   selector: (row) => row.transacionInfo?.amount,
    // },
    // {
    //   name: <h6 style={{ fontWeight: "bold" }}> Currency</h6>,
    //   selector: (row) => row.transacionInfo?.currency,
    // },
  ];

  //register customer
  console.log(isUpdating);
//   const handlerSubmit = (e) => {
//     e.preventDefault();

//     if (!isUpdating) {
//       const data = {
//         salesAgentAddress,
//         salesAgentPhone,
//         salesAgentName,
//         userId,
//       };

//       if (!salesAgentName || !salesAgentPhone) {
//         return;
//       }
//       registerAgent(data);
//       setmodal_list(false);
//       setsalesAgentName("");
//       setsalesAgentPhone("");
//       setsalesAgentAddress("");
//       console.log(data);
//     }
//     if (isUpdating) {
//       console.log("updd");
//       const data = {
//         salesAgentAddress,
//         salesAgentPhone,
//         salesAgentName,
//         id: _id,
//       };

//       if (!salesAgentName || !salesAgentPhone) {
//         return;
//       }
//       // updateCustomer(data);
//       updateAgents(data);
//       setmodal_list(false);
//       setsalesAgentName("");
//       setsalesAgentPhone("");
//       setsalesAgentAddress("");
//     }
//   };

  //delet customer

//   const deleteCus = (data) => {
//     setmodal_delete(true);
//     set_ID(data._id);
//   };
//   const deleteAgentss = () => {
//     deleteAgents(_id);
//     setmodal_delete(false);
//   };

//   // update form

//   const updateForm = (data) => {
//     setmodal_list(true);
//     setsalesAgentName(data.salesAgentName);
//     setsalesAgentPhone(data.salesAgentPhone);
//     setsalesAgentAddress(data.salesAgentAddress);
//     setIsUpdating(true);
//     set_ID(data._id);
//   };

//   const addModal = () => {
//     tog_list();
//     setIsUpdating(false);
//     setsalesAgentName("");
//     setsalesAgentPhone("");
//     setsalesAgentAddress("");
//   };
//   const showToastMessage = (message) => {
//     toast.error(message, {
//       position: toast.POSITION.TOP_RIGHT,
//     });
//   };
//   const handleChangePhone = (e) => {
//     const limit = 10;

//     // Here we are checking if the length is equal to 9
//     if (e.target.value.length === 10) {
//       showToastMessage("Phone number should not exceed 10 digits!");
//       setsalesAgentPhone(e.target.value.slice(0, limit));
//     }
//     setsalesAgentPhone(e.target.value.slice(0, limit));
//   };
//   const sortAgents = [];
//   for (let i = 0; i < agents?.length; i++) {
//     let singleArr = [
//       agents[i].salesAgentName,
//       agents[i].salesAgentPhone,
//       agents[i].salesAgentAddress,
//       agents[i]._id,
//     ];

//     sortAgents.push(singleArr);
//   }
const load = () => {
    if (isLoading) {
      return (
        <>
          <div className="page-content">
            <Container fluid>
              <BreadCrumb title="Manage Cables" pageTitle="Billing" />
              <Row>
                <Col lg={12}>
                  <Card>
                    <CardBody>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src="https://i.pinimg.com/originals/48/6a/a0/486aa0fa1658b7522ecd8918908ece40.gif"
                          style={{ backgroundColor: "white !", width: "700px" }}
                        />
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </>
      );
    }
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Monthly Applicants" pageTitle="Applicants" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-3">
                    <Col className="col-sm-auto">
                      <div>
                        <div>
                          <ToastContainer />
                          <h4 className="card-title mb-0">Monthly Applicants</h4>
                        </div>
                      </div>
                    </Col>
                    <Col className="col-sm">
                      <div className="d-flex justify-content-sm-end">
                        <div>
                          {/* <Button
                            color="success"
                            className="add-btn me-1"
                            onClick={addModal}
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                            Add
                          </Button> */}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>

                <CardBody>
                  <div id="customerList">
                    <Row className="g-4 mb-3"></Row>

                    {/* {auto.length > 0 && (
                      <TableContainer
                        columns={columns}
                        data={auto || []}
                        isGlobalFilter={true}
                        isAddUserList={false}
                        customPageSize={10}
                        className="custom-header-css"
                        // handleCustomerClick={handleCustomerClicks}
                        // isCustomerFilter={true}
                      />
                    )} */}

                    <DataTable
                      columns={columnss}
                      data={filteredItems}
                      pagination
                      paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                      subHeader
                      subHeaderComponent={subHeaderComponentMemo}
                      persistTableHead
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* end of container */}
        </Container>
      </div>

      {/* Add Modal */}
      {/* customer Registration From */}


    </React.Fragment>
  );
};

export default MonthlyApplicants;
