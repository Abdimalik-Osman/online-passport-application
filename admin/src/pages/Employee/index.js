import React, {
  useState,
  useEffect,
  useContext,
  componentDidMount,
  useRef,
  useMemo,
} from "react";
import { Helmet } from "react-helmet";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { ToastContainer, toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
  Alert,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import "./styleEmp.css";
const EmployeeRegistration = () => {
  // Employees
  const [EmployeeId, setEmployeeId] = useState();
  const [employeeName, setEmployeeName] = useState("");
  const [titleId, setTitle] = useState("");
  const [employeePhone, setEmployeePhone] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState();
  const [BaseSalary, setBaseSalary] = useState();
  const [sex, setSex] = useState("Male");
  const [empType, setEmpType] = useState();
  const [status, setStatus] = useState();

  const [EmployeeDepartment, setEmployeeDepartment] = useState("");
  const [Branch, setBranch] = useState();
  const [groupId, setGroup] = useState();
  const [zoonId, setZone] = useState();

  const [SiteId, setSiteId] = useState();
  const [UserId, setUserId] = useState();
  const [hiredate, setHiredate] = useState();
  const [checked, setChecked] = useState(true);

  const [Disable, setDisable] = useState(true);
  const [HasSite, setHasSite] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [object_id, setObject] = useState();
  const [modal_list, setmodal_list] = useState(false);
  const [isError, setIsError] = useState(false);

  const tog_list = () => {
    setChecked(false);
    setmodal_list(!modal_list);
    setIsEditing(false);
    setDisable(false);
  };

  const [modal_delete, setmodal_delete] = useState(false);
  const tog_delete = () => {
    setmodal_delete(!modal_delete);
  };

  const handleChange = () => {
    setChecked(!checked);
    setDisable(!Disable);
    setHasSite(!HasSite);
    setSiteId("Select Site");
  };

  const clear = () => {
    setEmployeeId("");
    setEmployeeName("");
    setStatus("");    setEmployeePhone("");
    setEmployeeEmail("");
    setEmployeeDepartment("");
    setSiteId("");
    setEmpType("");
    setSex("");
    setBaseSalary("");
  };
  const handleChangePhone = (e) => {
    const limit = 10;

    // Here we are checking if the length is equal to 9
    if (e.target.value.length === 10) {
      showToastMessage("Phone number should not exceed 10 digits!");
      setEmployeePhone(e.target.value.slice(0, limit));
    }
    setEmployeePhone(e.target.value.slice(0, limit));
  };
  document.title = "Employee Registration  ";

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "empName",
        filterable: false,
      },
      {
        Header: "Phone Number",
        accessor: "mobile",
        filterable: false,
      },
      {
        Header: "Department",
        accessor: "departmentName",
        filterable: false,
      },
      {
        Header: "Title",
        accessor: "titleName",
        filterable: false,
      },
      {
        Header: "Hired Date",
        accessor: "hireDate",
        filterable: false,
        // Cell: (cell) => <>{handleValidDate(cell.value)}</>,
      },
      //   {
      //     Header: "Action",
      //     Cell: (cellProps) => {
      //       return (
      //         <ul className="list-inline hstack gap-2 mb-0">
      //           <li className="list-inline-item edit" title="Edit">
      //             <Link
      //               to="#"
      //               className="text-primary d-inline-block edit-item-btn"
      //               onClick={(row) => {
      //                 const customerData = cellProps.row.original;
      //                 editPop(customerData);
      //               }}
      //             >
      //               <i className="ri-pencil-fill fs-16"></i>
      //             </Link>
      //           </li>
      //           <li className="list-inline-item" title="Remove">
      //             <Link
      //               to="#"
      //               className="text-danger d-inline-block remove-item-btn"
      //               onClick={(row) => {
      //                 const customerData = cellProps.row.original;
      //                 deletPop(customerData);
      //               }}
      //             >
      //               <i className="ri-delete-bin-5-fill fs-16"></i>
      //             </Link>
      //           </li>
      //         </ul>
      //       );
      //     },
      //   },
    ]
    // [handleCustomerClick]
  );
  const closing = () => {
    // setIsEditing(false);
    setmodal_list(false);
    clear();
  };

  const showToastMessage = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const addModal = () => {
    tog_list();
    setEmployeeId("");
    setEmployeeName("");
    setEmployeePhone("");
    setEmployeeEmail("");
    setEmployeeDepartment("");
    setTitle("");
    setBaseSalary("");
    setSex("");
    setEmpType("");
    setGroup("");
    setZone("");
    setBranch("");
    setSiteId("");
    setUserId("");
    setIsEditing(false);
  };

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(employeeName);
    console.log(employeePhone);
    console.log(sex);
    console.log(empType);
    console.log(status);
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Helmet>
            <script src="html2pdf.bundle.min.js"></script>
          </Helmet>
          <BreadCrumb
            title="Employee Registration "
            pageTitle="Employee Registration"
          />
          <embed
            style={{
              display: "none",
            }}
            type="application/pdf"
            src="path_to_pdf_document.pdf"
            id="pdfDocument"
            width="100%"
            height="100%"
          />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-3">
                    <Col className="col-sm-auto">
                      <div>
                        <div>
                          <ToastContainer />
                          <h4 className="card-title mb-0">Add Employee</h4>
                        </div>
                      </div>
                    </Col>
                    <Col className="col-sm">
                      <div className="d-flex justify-content-sm-end">
                        <div>
                          <Button
                            color="success"
                            className="add-btn me-1"
                            onClick={addModal}
                            id="create-btn">
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                            Add
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
              </Card>
            </Col>
          </Row>
        </Container>

        <Modal
          isOpen={modal_list}
          toggle={() => {
            tog_list();
          }}
          centered
          size="lg">
          {/* <ModalHeader className="bg-light p-3">
                    Add New Employee
                    <Button
                        type="button"
                        onClick={() => {
                            setmodal_list(false);
                        }}
                        className="btn-close"
                        aria-label="Close"
                    ></Button>
                </ModalHeader> */}
          <div className="bg-light p-3 modal-header">
            <h5 className="modal-title">Add New Employee</h5>

            <Button
              type="button"
              onClick={() => {
                setmodal_list(false);
              }}
              className="btn-close"
              aria-label="Close"></Button>
          </div>
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <div className="mb-3" id="modal-id" style={{ display: "none" }}>
                <label htmlFor="id-field" className="form-label">
                  ID
                </label>
                <input
                  type="text"
                  id="id-field"
                  className="form-control"
                  placeholder="ID"
                  readOnly
                />
              </div>
              <Row>
                <Col md={6}>
                  <div className="mb-3">
                    <label className="form-label">Employee Name</label>
                    <span style={{ marginLeft: "5px", color: "red" }}>*</span>
                    <input
                      type="text"
                      
                      className="form-control"
                      placeholder="Enter Employee Name"
                      required
                      onChange={(e) => setEmployeeName(e.target.value)}
                      value={employeeName}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <label>Phone</label>
                  <span style={{ marginLeft: "5px", color: "red" }}>*</span>
                  <div className="mb-3">
                    <input
                      type="number"
                      id="empPhone"
                      className="form-control"
                      placeholder="Enter Phone"
                      required
                      // onChange={(e) =>
                      //     setEmployeePhone(e.target.value)}

                      // onChange={(e) => {
                      //     setEmployeePhone(e.target.value);
                      //     // if (e.target.value.length > 9) {
                      //     //     setIsError(true);
                      //     // }
                      // }}
                      onChange={handleChangePhone}
                      value={employeePhone}></input>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="input-group">
                    <Label
                      className="input-group-text"
                      htmlFor="inputGroupSelect01">
                      Sex
                    </Label>
                    <select className="form-select" name="sex" id="sex" value={sex} onChange={(e)=>setSex(e.target.value)} >
                      <option>Choose...</option>
                      <option  value="Male">Male</option>
                      <option  value="Female">Female</option>
                    </select>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="input-group">
                    <Label
                      className="input-group-text"
                      htmlFor="inputGroupSelect01">
                      Type
                    </Label>
                    <select className="form-select" id="inputGroupSelect01" name="empType" value={empType} onChange={(e)=>setEmpType(e.target.value)}>
                      <option>Employee Type..</option>
                      <option defaultValue="manager">Manager</option>
                      <option defaultValue="employee">Employee</option>
                    </select>
                  </div>
                </Col>
              </Row>
             

              <Row>
                <Col lg={6}>
                  <div className="input-group my-4">
                    <Label
                      className="input-group-text"
                      htmlFor="inputGroupSelect01">
                      Status
                    </Label>
                    <select className="form-select" id="inputGroupSelect01" name="status" value={status} onChange={(e)=> setStatus(e.target.value)}>
                      <option>Status...</option>
                      <option defaultValue="Active">Active</option>
                      <option defaultValue="inActive">In Active</option>
                    </select>
                  </div>
                </Col>
              </Row>
            
            </ModalBody>
            <ModalFooter>
              <div className="hstack gap-2 justify-content-end">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => closing()}>
                  Close
                </button>
                <button type="submit" className="btn btn-success" id="add-btn">
                  {isEditing ? "Update" : "Add"}
                </button>
              </div>
            </ModalFooter>
          </form>

          {/* =================================== */}
        </Modal>

        
      </div>
    </React.Fragment>
  );
};

export default EmployeeRegistration;