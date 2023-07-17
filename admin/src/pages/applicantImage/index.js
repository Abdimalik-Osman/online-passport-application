import React, {
    useState,
    useEffect,
    useContext,
    componentDidMount,
    useRef,
    useMemo,
  } from "react";
  import Select from "react-select";
  import {Link} from "react-router-dom"
  import { Helmet } from "react-helmet";
  import BreadCrumb from "../../Components/Common/BreadCrumb";
  import TableContainer from "../../Components/Common/TableContainer";
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
  import "../Employee/styleEmp.css"
  import { LoginContext } from './../../Components/Context/loginContext/LoginContext';
  import moment from "moment";
  
  const ApplicantImage = () => {
    const {
      EmployeeRegister, getEmployees, fetchEmployees,   fetchUnapprovedApplicants,fetchSingleUnapprovedApplicant,applicantInfo,
      unapprovedApplicants, updateApplicantInfo, uploadImage,getApplicantImage,applicantImage
     
    } = useContext(LoginContext);
    const [image,setImage] = useState()
    useEffect(()=>{
        // if(applicantImage){
        //     setImage()
        // }
        let id = "64b5802fecc3f0ab5b0c8031"
         fetch(`http://localhost:4000/api/applicants/images/${id}`)
        .then(response => response.blob())
        .then(blob => setImage(URL.createObjectURL(blob)))
        .catch(error => console.error(error));
    },[])
  
    document.title = "Employee Registration  ";
  
    
    const handleCLick = ()=>{
        let id = "64b5802fecc3f0ab5b0c8031"
         getApplicantImage(id)
       }
  console.log(image)
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
                            //   onClick={addModal}
                              id="create-btn">
                              <i className="ri-add-line align-bottom me-1"></i>{" "}
                              Add
                            </Button>
                          </div>
                          <div>
                            <Button
                              color="primary"
                              className="add-btn me-1 mx-3 "
                            //   onClick={approveModal}
                              id="create-btn">
                              <i className="ri-add-line align-bottom me-1"></i>{" "}
                              APPROVE APPLICANT
                            </Button>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <div id="Purchasestable">
                      <Row className="g-4 mb-3"></Row>
                      
                      
                    </div>
                    <form>
                    <Row>
              <Col md={6} sm={12} lg={4}>
                    <div className="mb-2">
                    <button
                    type="button"
                    onClick={handleCLick}
                    className="btn btn-success"
                    id="add-btn">
                    GET IMAGE
                  </button>
                  {image ? <img src={image} alt="Processed image" /> : 'Loading...'}
                      {/* <Label htmlFor="nID" className="form-label">
                       Enter Applicant National ID
                        <span className="text-danger">*</span>
                      </Label> */}
                      {/* <Input
                        name="nID"
                        type="Number"
                        placeholder="National ID"
                        value={passNid}
                        onChange={(e)=>setPassNid(e.target.value)}
                        required
                        
                      /> */}
                    </div>
              </Col>
              </Row>
                    </form>                    {/* end of container */}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>

  
          
        </div>
      </React.Fragment>
    );
  };
  
  export default ApplicantImage;

