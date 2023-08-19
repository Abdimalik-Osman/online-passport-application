import React, {
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  Row
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
//   import "./styleEmp.css";
  import moment from "moment";
import { LoginContext } from './../../Components/Context/loginContext/LoginContext';
  
  
  const RegisterHolydays = () => {
    const {
      User,
      EmployeeRegister, getEmployees, fetchEmployees,fetchStates,districts,selectedState,districtData,fetchSelectedState,fetchSingleDistrict,
      registerDistrictHolydays,fetchDistrictHolydays,deleteDistrictHolyday,updateDistrictHolyday,
     
    } = useContext(LoginContext);
    

    const [checked, setChecked] = useState(true);
  
    const [isEditing, setIsEditing] = useState(false);

    const [modal_list, setmodal_list] = useState(false);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState("");
    const [year, setYear] = useState("");
    const [minDate, setMinDate] = useState('');
  console.log(year)
    const currentDate = new Date().toISOString().split('T')[0];
    if (!minDate) {
      setMinDate(currentDate);
    }
    useEffect(()=>{
      fetchEmployees()
      fetchStates()
    },[])
    const tog_list = () => {
      setChecked(false);
      setmodal_list(!modal_list);
      setIsEditing(false);
    //   setDisable(false);
    };
  
    const [modal_delete, setmodal_delete] = useState(false);
    const tog_delete = () => {
      setmodal_delete(!modal_delete);
    };
  

  
    const clear = () => {
     setYear("")
     setMessage("")
    };

  
 
    // register new district holyday
    const myItemString = localStorage.getItem('user');
    const user = JSON.parse(myItemString);
    const districtId = user?.data.districtId;
    const handlerSubmit = (e) => {
      if (isEditing == false) {
        e.preventDefault();
        if (checked == false) {
          if (
            !year ||
            !message 
          ) {
            showToastMessage("Please Fill Required Fields !");
            return;
          }
  
          const data = {
            year,
            message,
            districtId:districtId
          };
        
          // console.log(user?.data.districtId)

          registerDistrictHolydays(data);
          setmodal_list(false);
  // 
          // setEmployeeId("");
          setYear("");
          setMessage("");
      
  
        //   console.log(data);
        } else {
          if (
            !year ||
            !message
            
          ) {
            showToastMessage("Please Fill Required Fields !");
            return;
          }
  
          const data = {
            year,
            message,
            districtId:districtId
          };
          registerDistrictHolydays(data);
          setmodal_list(false);
  
          setMessage("");
          setYear("");
     
        }
      }
  
      if (isEditing == true) {
        e.preventDefault();
  
        if (checked == false) {
          const data = {
            year,
            message,
          };
          console.log(data);
          // updateEmployee(data);
          setIsEditing(false);
          setmodal_list(false);
          setYear("");
          setMessage("");
          
        } else {
          const data = {
            year,
            message,
            districtId:districtId
          };
          console.log(data);
          updateDistrictHolyday(data);
          setIsEditing(false);
          setmodal_list(false);
          setYear("");
          setMessage("");
         
          
        }
      }
    };
  
    const editPop = (data) => {
      setmodal_list(true);
    //   setYear(data.year);
      setMessage(data._id);
      

  
  
      // if (data.siteId == null || data.siteId == ""){
      //   setChecked(false);
      //   setDisable(false);
      // }else{
      //   setChecked(true);
      //   setDisable(true);
      // }
      setIsEditing(true);
    };
    const deletPop = (data) => {
      setmodal_delete(true);
    //   setEmployeeId(data);
      
    };
  // console.log(districts);
    document.title = "Holyday Registration  ";
    const handleValidDate = (date) => {
      const date1 = moment(new Date(date)).format("DD MMM Y");
      return date1;
    };
    const columns = useMemo(
      () => [
        {
          Header: "Name",
          accessor: "empName",
          filterable: false,
        },
        {
          Header: "Phone Number",
          accessor: "empPhone",
          filterable: false,
        },
        {
          Header: "Gender",
          accessor: "sex",
          filterable: false,
        },
        {
          Header: "Employee Type",
          accessor: (row) => (row.isManager ? "Manager" : "Employee"),
          filterable: false,
        },
        {
          Header: "Status",
          accessor: (row) => (row.isActive ? "Active" : "In Active"),
          filterable: true,
        },
       
        {
          Header: "Hired Date",
          accessor: "createdAt",
          filterable: true,
          Cell: (cell) => <>{handleValidDate(cell.value)}</>,
        },
          {
            Header: "Action",
            Cell: (cellProps) => {
              return (
                <ul className="list-inline hstack gap-2 mb-0">
                  <li className="list-inline-item edit" title="Edit">
                    <Link
                      to="#"
                      className="text-primary d-inline-block edit-item-btn"
                      onClick={(row) => {
                        const customerData = cellProps.row.original;
                        editPop(customerData);
                      }}
                    >
                      <i className="ri-pencil-fill fs-16"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item" title="Remove">
                    <Link
                      to="#"
                      className="text-danger d-inline-block remove-item-btn"
                      onClick={(row) => {
                        const customerData = cellProps.row.original;
                        deletPop(customerData);
                      }}
                    >
                      <i className="ri-delete-bin-5-fill fs-16"></i>
                    </Link>
                  </li>
                </ul>
              );
            },
          },
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
      setYear("");
      setMessage("");
    
      setIsEditing(false);
    };
  
    const handleSubmit = (e)=>{
      e.preventDefault();

    }
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Helmet>
              <script src="html2pdf.bundle.min.js"></script>
            </Helmet>
            <BreadCrumb
              title="Holyday Registration "
              pageTitle="Holyday Registration"
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
                            <h4 className="card-title mb-0">Holyday Registration</h4>
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
                  <CardBody>
                    <div id="Purchasestable">
                      {/* <Row className="g-4 mb-3"></Row>
                      
                      <TableContainer
                        columns={columns}
                        data={getEmployees || []}
                        isGlobalFilter={true}
                        isAddUserList={false}
                        customPageSize={10}
                        className="custom-header-css"
                    
                          pagination={{ enabled: true, limit: 10 }}
                        />  */}
                    </div>
  
                    {/* end of container */}
                  </CardBody>
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
              <h5 className="modal-title">Add New Holyday</h5>
  
              <Button
                type="button"
                onClick={() => {
                  setmodal_list(false);
                }}
                className="btn-close"
                aria-label="Close"></Button>
            </div>
            <form onSubmit={handlerSubmit}>
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
                <Col md={3}>
                        <div>
                          <Label htmlFor="PurchasesDate" className="form-label">
                            Select year
                          </Label>
                          
                            <input
                                type="date"
                                name="appointmentDate"
                                onChange={(e)=>setYear(e.target.value)}
                                min={minDate}
                                className="form-control"
                                value={year}
                            />
                        </div>
                      </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="form-label">Message</label>
                      <span style={{ marginLeft: "5px", color: "red" }}>*</span>
                      <textarea name="" className="form-control"
                        placeholder="Enter Message"
                        required
                        onChange={(e) => setMessage(e.target.value)}
                        value={message} cols="10" rows="3"></textarea>

                    
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
  
  export default RegisterHolydays;
  