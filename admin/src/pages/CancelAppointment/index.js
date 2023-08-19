import React, { useContext, useEffect, useMemo, useState } from "react";


import moment from "moment";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  Row
} from "reactstrap";

import Flatpickr from "react-flatpickr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainer";
import { LoginContext } from "../../Components/Context/loginContext/LoginContext";
const CancelAppointment = () => {
 
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [helper, setHelper] = useState(false);
  const [message, setMessage] = useState();
  const [modal_list, setmodal_list] = useState(false);
  const tog_list = () => {
    setmodal_list(!modal_list);
  };

  const cancelModal = () => {
    tog_list();
    setmodal_list(true)
    // setEditing(false);
   
  };

  document.title = "Cancel Appointment";
  const myItemString = localStorage.getItem('user');
  const user = JSON.parse(myItemString);
  const district = user?.data.districtId;
  const userId = user?.data._id;
  const {
    getAppointment,
    cancelAppointmentFun,
    appointments
  } = useContext(LoginContext);

  useEffect(() => {
    const date1 = moment(new Date()).format("YYYY-MM-DD");
    getAppointment(date1,district)
  }, []);

  // console.log(openCardsReport);
  // console.log(allopenCardReport);

  // console.log(openDate);
  // console.log(start);
  // console.log(end);
  // console.log(OpenCards);
  const handleValidDate = (date) => {
    const date1 = moment(new Date(date)).format("DD MMM YYYY");
    return date1;
  };
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "fullname",
        filterable: false,
      },
      {
        Header: "Phone Number",
        accessor: "phoneNumber",
        filterable: false,
      },
      {
        Header: "Gender",
        accessor: "sex",
        filterable: false,
      },
      {
        Header: "Appointment Date",
        accessor: "appointmentDate",
        filterable: false,
        Cell: (cell) => <>{handleValidDate(cell.value)}</>,
      },
      {
        Header: "Appointment Time",
        accessor: "appointmentTime",
        filterable: false,
        
      },
    ]
    // [handleCustomerClick]
  );
  const showToastMessage = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };


  const filterThroughDate = () => {
    setHelper(true);
    const start1 = moment(start).format("YYYY-MM-DD");
    // const enddd = moment(end).format("YYYY-MM-DD");
    getAppointment(start1, district);
  };

  const clearFilter = () => {
    setHelper(false);
    setStart("");
    // setEnd("");
  };
  const showToastMessageError = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  // console.log(closeDate);
  const handlersubmit = (e) => {
    e.preventDefault();

    const data = {
      applicants: appointments,
      message: message
    }

    if (message == "" || message == undefined) {
      showToastMessageError("Please make sure to fill description field");
    }else if(!data.applicants || data.applicants == undefined || data.applicants.length == 0){
      showToastMessageError("Please make sure to have an appointment");
    } else {
      cancelAppointmentFun(data);
      console.log(data)
      setmodal_list(false);
    }
  };
  
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Cancel Appointment " pageTitle="Cancel" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-3">
                    <Col className="col-sm-austo">
                      <div>
                        <ToastContainer />
                      
                      </div>
                    </Col>
                  </Row>
                </CardHeader>

                <CardBody>
                  <div id="Purchasestable">
                    <Row className="">
                      {/* <Col md={3}>
                        <div className="mb-3">
                          <label>Supplier</label>
                          <Select
                            options={suppliersArr}
                            onChange={(choice) => setSupplierId(choice)}
                            theme={(theme) => ({
                              ...theme,
                              borderRadius: 0,
                              colors: {
                                ...theme.colors,
                                // text: "orangered",
                                // primary25: "hotpink",
                                // primary: "black",
                              },
                            })}
                          />
                        </div>
                      </Col> */}
                      <Col md={3}>
                        <div>
                          {/* <Label htmlFor="PurchasesDate" className="form-label">
                            Date
                          </Label> */}
                          <Flatpickr
                            className="form-control mt-2"
                            required
                            placeholder="DD/MM/YYYY"
                            options={{
                              dateFormat: "d/m/Y",
                              defaultDate: "today",
                            }}
                            onChange={([date]) => setStart(date)}
                            value={start}
                          />
                        </div>
                      </Col>
                      {/* <Col md={2}>
                        <div>
                          <Label htmlFor="PurchasesDate" className="form-label">
                            End Date
                          </Label>
                          <Flatpickr
                            className="form-control"
                            required
                            placeholder="DD/MM/YYYY"
                            options={{
                              dateFormat: "d/m/Y",
                              defaultDate: "today",
                            }}
                            onChange={([date]) => setEnd(date)}
                            value={end}
                          />
                        </div>
                      </Col> */}
                      <Col md={2}>
                        <div className="form-label">
                          <Button
                            color="success"
                            className=" add-btn mt-2"
                            onClick={filterThroughDate}
                            type="button"
                            //  id="create-btn"
                          >
                            <i className="  ri-file-list-line align-bottom me-1 "></i>{" "}
                            Filter By Date{" "}
                          </Button>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="form-label">
                          <Button
                            color="primary"
                            className=" add-btn mt-2"
                            onClick={cancelModal}
                            type="button"
                            //  id="create-btn"
                          >
                            <i className="  ri-file-list-line align-bottom me-1 "></i>{" "}
                            Cancel Appointments{" "}
                          </Button>
                        </div>
                      </Col>
                    </Row>

                    <TableContainer
                      columns={columns}
                      data={appointments || []}
                      isGlobalFilter={true}
                      isAddUserList={false}
                      customPageSize={10}
                      className="custom-header-css"
                      // handleCustomerClick={handleCustomerClicks}
                      // isCustomerFilter={true}
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
      {/* Open Closed Card Distribution From */}
      <Modal
        isOpen={modal_list}
        toggle={() => {
          tog_list();
        }}
        centered
        size="lg"
        backdrop={"static"}
      >
        <div className="bg-light p-3 modal-header">
          <h5 className="modal-title"> Cancel Appointments</h5>
          <button
            type="button"
            className="btn-close"
            onClick={cancelModal}
            aria-label="Close"
          ></button>
        </div>
        <ModalBody className="text-center p-5">
          <lord-icon
            src="https://cdn.lordicon.com/tdrtiskw.json"
            trigger="loop"
            colors="primary:#f7b84b,secondary:#405189"
            style={{ width: "130px", height: "130px" }}
          ></lord-icon>
          <div>
            <h4>Are You Sure You Want To Cancel this Appointment Date ?</h4>
          </div>
          <form onSubmit={handlersubmit}>
            <div className="mb-3">
              <label htmlFor="message-text" className="col-form-label">
                Message:
              </label>
              {/* <span style={{ marginLeft: "5px", color: "red" }}>*</span> */}
              <textarea
                className="form-control"
                id="message-text"
                rows="2"
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <div className="hstack gap-2 justify-content-end">
            <button
              type="button"
              className="btn btn-light"
              onClick={() => setmodal_list(false)}
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-success"
              id="add-btn"
              onClick={handlersubmit}
            >
              Yes, Cancel
            </button>
          </div>
        </ModalFooter>
      </Modal>
      {/* Remove Modal */}
    </React.Fragment>
  );
};

export default CancelAppointment;
