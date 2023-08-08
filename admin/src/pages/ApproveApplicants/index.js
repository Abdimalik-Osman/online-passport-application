import moment from "moment";
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
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  Row
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainer";
import "../Employee/styleEmp.css";
import { LoginContext } from './../../Components/Context/loginContext/LoginContext';
  
  const ApproveApplicants = () => {
    const {
      EmployeeRegister, getEmployees, fetchEmployees,   fetchUnapprovedApplicants,fetchSingleUnapprovedApplicant,applicantInfo,
      unapprovedApplicants, updateApplicantInfo, uploadImage
     
    } = useContext(LoginContext);
    const [fName, setFname] = useState();
    const [lName, setLname] = useState();
    const [mFname, setMFname] = useState();
    const [mLname, setMLname] = useState();
    const [occupation, setOccupation] = useState();
    const [status, setStatus] = useState();
    const [pob, setPob] = useState();
    const [dob, setDob] = useState();
    const [districtId, setDistrictId] = useState();
    const [emergencyContactNumber, setEmergencyContactNumber] = useState();
    const [emergencyContactName, setEmergencyContactName] = useState();
    const [email, setEmail] = useState();
    const [type, setType] = useState();
    // const [amount, setAmount] = useState();
    const [appointmentDate, setAppointmentDate] = useState();
    const [appointmentTime, setAppointmentTime] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [image, setImage] = useState([]);
    const [appImage, setAppImage] = useState();
    const [changePassword, setChangePassword] = useState("No");
    const [nationalId, setNationalId] = useState("");
    // const [modal_list, setmodal_list] = useState(false);
    const [id, setId] = useState("");
    // const [checked, setChecked] = useState(true);
    const [state, setState] = useState(true);
    // const [nId, setId] = useState();
    const [selectedSex, setSelectedSex] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [EmployeeId, setEmployeeId] = useState();
    const [employeeName, setEmployeeName] = useState("");
    const [file, setFile] = useState("");
    const [employeePhone, setEmployeePhone] = useState("");
    const [employeeEmail, setEmployeeEmail] = useState();
    const [BaseSalary, setBaseSalary] = useState();
    const [sex, setSex] = useState("Male");
    const [empType, setEmpType] = useState();
    // const [status, setStatus] = useState();
  
    const [EmployeeDepartment, setEmployeeDepartment] = useState("");
    const [Branch, setBranch] = useState();
    const [groupId, setGroup] = useState();
    const [zoonId, setZone] = useState();
  
    const [passNid, setPassNid] = useState();
    const [passPhoneNumber, setPassPhoneNumber] = useState();
    const [hiredate, setHiredate] = useState();
    const [checked, setChecked] = useState(true);
  
    const [Disable, setDisable] = useState(true);
    const [HasSite, setHasSite] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [object_id, setObject] = useState();
    const [modal_list, setmodal_list] = useState(false);
    const [approveModalList, setApproveModalList] = useState(false);
    const [isError, setIsError] = useState(false);
    const [bgRemove, setBgRemove] = useState("");
    const [finger_data, setFinger_data] = useState({
      template: "",
      
      img: "",
      
      quality: "",
      
    });
    const [acknow_id, setAcknow_id] = useState("");
    const [acknowModel, setAcknowModel] = useState(false);
    const [index, setIndex] = useState(0);
    const myItemString = localStorage.getItem('user');
    const user = JSON.parse(myItemString);
    const district = user?.data.districtId;
    const userId = user?.data._id;
    const data = {
      districtId:district,
      userId:userId
    }
    useEffect(()=>{
        fetchUnapprovedApplicants(data)
    },[])
    const tog_list = () => {
      setChecked(false);
      setmodal_list(!modal_list);
      setApproveModalList(!approveModalList);
      setIsEditing(false);
      setDisable(false);
    };
  
    const [modal_delete, setmodal_delete] = useState(false);
    const tog_delete = () => {
      setmodal_delete(!modal_delete);
    };
  
    const handleChange = () => {
      setChecked(!checked);
      // setDisable(!Disable);
      // setHasSite(!HasSite);
      // setSiteId("Select Site");
    };
  
    const clear = () => {
      setEmployeeId("");
      // setEmployeeName("");
      // setStatus("");    setEmployeePhone("");
      // setEmployeeEmail("");
      // setEmployeeDepartment("");
      // setSiteId("");
      // setEmpType("");
      // setSex("");
      // setBaseSalary("");
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
  
    const handlerSubmit = (e) => {
      if (isEditing == false) {
        e.preventDefault();
  
        if (isError == true) {
          showToastMessage("Please Provide Valid Phone number !");
          return;
        }
        if (checked == false) {
          if (
            !employeeName ||
            !employeePhone 
          ) {
            showToastMessage("Please Fill Required Fields !");
            return;
          }
  
          const data = {
            empName: employeeName,
            isManager: empType == "Manager"? true : false,
            isActive: status == "Active"? true : false,
            empPhone: employeePhone,
            sex:sex
  
          };
  
          EmployeeRegister(data);
          setmodal_list(false);
  // 
          // setEmployeeId("");
          setEmployeeName("");
          setEmployeePhone("");
          setSex("")
          setEmpType('')
          setStatus()
  
        //   console.log(data);
        } else {
          if (
            !employeeName ||
            !employeePhone
            
          ) {
            showToastMessage("Please Fill Required Fields !");
            return;
          }
  
          const data = {
            empName: employeeName,
            isManager: empType == "Manager"? true : false,
            isActive: status == "Active"? true : false,
            empPhone: employeePhone,
            sex:sex
  
          };
          EmployeeRegister(data);
          setmodal_list(false);
  
          setEmployeeId("");
          setEmployeeName("");
          setEmployeePhone("");
          setEmpType("");
          setSex("")
          setStatus("")
        }
      }
  
      if (isEditing == true) {
        e.preventDefault();
  
        if (checked == false) {
          const data = {
            empName: employeeName,
            isManager: empType == "Manager"? true : false,
            isActive: status == "Active"? true : false,
            empPhone: employeePhone,
            sex:sex
          };
        //   console.log(data);
          // updateEmployee(data);
          setIsEditing(false);
          setmodal_list(false);
          setEmployeeId("");
          setEmployeeName("");
          setEmployeePhone("");
          setEmpType("");
          setSex("")
          setStatus("")
        } else {
          const data = {
            empName: employeeName,
            isManager: empType == "Manager"? true : false,
            isActive: status == "Active"? true : false,
            empPhone: employeePhone,
            sex:sex
          };
        //   console.log(data);
          // updateEmployee(data);
          setIsEditing(false);
          setmodal_list(false);
          setEmployeeId("");
          setEmployeeName("");
          setEmployeePhone("");
          setEmployeeEmail("");
          
        }
      }
    };
    const editPop = (data) => {
      const id1 =  data?._id;
      setId(id1);
      const text = data?.fullname;
      const fullname = text?.split(" ");
      const motherName = data?.motherName;
      const motherFullname = motherName?.split(" ");

      const fname = fullname?.[0];
      const secondName = fullname?.[1];
     let firstName = fname?.concat(" ", secondName);
    let lastName = fullname?.[2];
      // ----------------
      const mFname = motherFullname?.[0];
      const mSecondName = motherFullname?.[1];
     let mFirstName = mFname?.concat(" ", mSecondName);
     let  mLastName = motherFullname?.[2];
        setmodal_list(true);
        setNationalId(data.nID);
        setPhoneNumber(data.phoneNumber);
        setAppointmentTime(data.appointmentTime);
        setAppointmentDate(moment(data.appointmentDate).format("YYYY-MM-DD"));
        setEmergencyContactName(data.emergencyContactName);
        setEmergencyContactNumber(data.emergencyContactNumber);
       
        setDob(moment(data.DOB).format("YYYY-MM-DD"));
        setPob(data.POB);
        setEmail(data.email);
        setOccupation(data.occupation);
        
        setMLname(mLastName);
        setMFname(mFirstName);
        setLname(lastName); 
        setFname(firstName); 
        setSelectedSex(data.sex); 
    
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
        // setEmployeeId(data);
        
      };
    document.title = "Approve Applicants";
    const handleValidDate = (date) => {
      const date1 = moment(new Date(date)).format("DD MMM Y");
      return date1;
    };
    const columns = useMemo(
      () => [
        {
          Header: "Full Name",
          accessor: "fullname",
          filterable: false,
        },
        {
          Header: "Mother Name",
          accessor: "motherName",
          filterable: false,
        },
        {
          Header: "Date of Birth",
          accessor: "DOB",
          filterable: false,
          Cell: (cell) => <>{handleValidDate(cell.value)}</>,
        },
        {
          Header: "Place of Birth",
          accessor: "POB",
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
          Header: "Emergency Contact Name",
          accessor: "emergencyContactName",
          filterable: false,
        },
        {
          Header: "Emergency Number",
          accessor: "emergencyContactNumber",
          filterable: false,
        },
        {
          Header: "Email",
          accessor:"email",
          filterable: true,
        },
       
        {
          Header: "Applying Date",
          accessor: "createdAt",
          filterable: true,
          Cell: (cell) => <>{handleValidDate(cell.value)}</>,
        },
        {
          Header: "Appointment Date",
          accessor: "appointmentDate",
          filterable: true,
          Cell: (cell) => <>{handleValidDate(cell.value)}</>,
        },
        {
          Header: "Appointment Time",
          accessor: "appointmentTime",
          filterable: false,
          
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
                        const applicantData = cellProps.row.original;
                        editPop(applicantData);
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
                        const applicantData = cellProps.row.original;
                        deletPop(applicantData);
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
  
    const approveModal = () => {
      tog_list();
      setmodal_list(false)
    }
    const addModal = () => {
      tog_list();
      setApproveModalList(false);
      setEmployeeId("");
      setEmployeeName("");
      // setEmployeePhone("");
      // setEmployeeEmail("");
      // setEmployeeDepartment("");
      // setTitle("");
      // setBaseSalary("");
      // setSex("");
      // setEmpType("");
      // setGroup("");
      // setZone("");
      // setBranch("");
      // setSiteId("");
      // setUserId("");
      setIsEditing(false);
    };
  

    // handle remove bg
    // const handleChangeBg = async () => {
    //       const apiKey = "77i7YWurRk3wxLQW2MfrMkd4";
    //       const url = "https://api.remove.bg/v1.0/removebg";
    //       const formData = new FormData();
    //       formData.append("image_file", image, image.name);
    //       formData.append("size", "auto");
    //       formData.append("width", "600px");
    //       formData.append("height", "600px");
      
    //       fetch(url, {
    //         method: "POST",
    //         headers: {
    //           "X-Api-key": apiKey
    //         },
    //         body: formData
    //       })
    //         .then((res) => res.blob())
    //         .then((blob) => {
    //           const reader = new FileReader();
    //           reader.onloadend = () => setBgRemove(reader.result);
    //           reader.readAsDataURL(blob);
    //            console.log("Removed background image size:", blob.size);
    //         })
    //         .catch((err) => console.error(err));
    //     };
       //handle and convert it in base 64
       const handleImage = (e) =>{
        const file = e.target.files[0];
        setFileToBase(file);
        console.log(file);
    }

    const setFileToBase = (file) =>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>{
            setImage(reader.result);
        }

    }
    const handleChangeBg = async () => {
      const apiKey = "77i7YWurRk3wxLQW2MfrMkd4";
      const url = "https://api.remove.bg/v1.0/removebg";
      const formData = new FormData();
      formData.append("image_file", file, file.name);
      formData.append("size", "auto");
      // formData.append("width", "600px");
      // formData.append("height", "600px");
    
      fetch(url, {
        method: "POST",
        headers: {
          "X-Api-key": apiKey
        },
        body: formData
      })
        .then((res) => {
          const filenameFromUrl = file.name; // Extract filename from the URL
          const fileType = res.headers.get("Content-Type");
          return Promise.all([filenameFromUrl, fileType, res.blob()]);
        })
        .then(([filename, fileType, blob]) => {
          const reader = new FileReader();
          reader.onloadend = () => setBgRemove(reader.result);
          reader.readAsDataURL(blob);
          console.log("Removed background image size:", blob.size);
          console.log("Filename:", filename);
          console.log("File type:", fileType);
        })
        .catch((err) => console.error(err));
    };
    
    const handleSubmit = (e)=>{
      e.preventDefault();
    //   console.log(employeeName);
    //   console.log(employeePhone);
    //   console.log(sex);
      // console.log(id);
      // console.log(image);
      
        // const img = finger_data.img
      
    uploadImage(image,id)
    }
    // console.log(unapprovedApplicants)
    const getApplicantInfo = () => {
      let nID = passNid? passNid : "ALL";
      let phoneNumber = passPhoneNumber? passPhoneNumber : "ALL";
      fetchSingleUnapprovedApplicant(nID,phoneNumber);
      console.log(applicantInfo)
    }

    // handle approve applicant
    const handleApproveApplicant = (e)=>{
      e.preventDefault();
      if(!applicantInfo){
        toast.error("no applicant information available");
      }
      // if(!bgRemove){
      //   toast.error("please select image");
      // }
      console.log(image)
      const formData = new FormData();
      formData.append('image', image);
      uploadImage(image)


    }

    // const scanFinger = () => {
    //   CallSGIFPGetData(
        
    //     setFinger_data,
       
    //   )
      
    // }
    // console.log(finger_data)
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Helmet>
              <script src="html2pdf.bundle.min.js"></script>
            </Helmet>
            <BreadCrumb
              title="Approve Applicants"
              pageTitle="Approve Applicants"
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
                            <h4 className="card-title mb-0">Approve Applicants</h4>
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
                          <div>
                            <Button
                              color="primary"
                              className="add-btn me-1 mx-3 "
                              onClick={approveModal}
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
                      
                      <TableContainer
                        columns={columns}
                        data={unapprovedApplicants || []}
                        isGlobalFilter={true}
                        isAddUserList={false}
                        customPageSize={10}
                        className="custom-header-css"
                    
                          pagination={{ enabled: true, limit: 10 }}
                        /> 
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
            size="lg"
            backdrop={"static"}>
            <div className="bg-light p-3 modal-header">
              <h5 className="modal-title">
                {" "}
                {isEditing ? "Approve Applicant" : "Add New Applicant"}{" "}
              </h5>

              <button
                type="button"
                className="btn-close"
                onClick={() => {
                    setmodal_list(false);
               }}
                aria-label="Close"></button>
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
                    
                    readOnly
                  />
                </div>

                {/*personal information  */}
                <Row>
                <legend  className="text-center">Personal Information</legend>
                  {/* <Col md={8}>
                    <div className="mb-3">
                      <label className="form-label">
                        Employee <span className="text-danger">*</span>
                      </label>

                      <div>
                        <Select
                          // className="bg-white"
                          options={Emp}
                          onChange={(choice) => setEmployeeId(choice)}
                          value={Emp?.filter(function (option) {
                            return option.value === employeeId?.value;
                          })}
                          theme={(theme) => ({
                            ...theme,
                            borderRadius: 0,
                            colors: {
                              ...theme.colors,
                            },
                          })}
                        />
                      </div>
                    </div>
                  </Col> */}

                  <Col md={2}>
                    <div className="mb-3">
                      <Label htmlFor="national-id" className="form-label">
                        National-ID <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="national-id"
                        type="text"
                        // placeholder="Enter your National ID"
                        required
                        onChange={(e) => setNationalId(e.target.value)}
                        value={nationalId}
                      />
                    </div>
                  </Col>
                

                  {/* first name */}
                  <Col md={6} sm={12} lg={5}>
                    <div className="mb-2">
                      <Label htmlFor="firstName" className="form-label">
                        First Name
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="fName"
                        type="text"
                        // placeholder="Enter your first name"
                        required
                        value={fName}
                        onChange={(e)=>setFname(e.target.value)}
                      />
                    </div>
                  </Col>
                  {/* last name */}
                  <Col md={6} sm={12} lg={5}>
                    <div className="mb-2">
                      <Label htmlFor="lastName" className="form-label">
                        Last Name
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="lName"
                        type="text"
                        // placeholder="Enter your last name"
                        required
                        value={lName}
                        onChange={(e)=>setLname(e.target.value)}
                      />
                    </div>
                  </Col>
                  {/* mother first name */}
                  <Col md={6} sm={12} lg={4}>
                    <div className="mb-2">
                      <Label htmlFor="mFname" className="form-label">
                        Mother First Name
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="mFname"
                        type="text"
                       
                        required
                        value={mFname}
                        onChange={(e)=>setMFname(e.target.value)}
                      />
                    </div>
                  </Col>
                  {/* mother Last name */}
                  <Col md={6} sm={12} lg={4}>
                    <div className="mb-2">
                      <Label htmlFor="mLname" className="form-label">
                        Mother Last Name
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="mLname"
                        type="text"
                        // placeholder="Mother Last Name"
                        required
                        value={mLname}
                        onChange={(e)=>setMLname(e.target.value)}
                      />
                    </div>
                  </Col>
                  {/* gender */}
                  <Col md={6} sm={12} lg={4}>
                    <div className="mb-3">
                      <label className="form-label">
                        Gender <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select "
                        id="sex"
                        required
                        onChange={(e) => setState(e.target.value)}
                        value={selectedSex}>
                        
                        <option value="">
                          &hellip; Choose an option &hellip;
                        </option>
                        {/* <option> Select Your Gender</option> */}
                        <option value="Male"> Male</option>
                        <option value="Female"> Female</option>
                      </select>
                    </div>
                  </Col>
                  {/* occupation */}
                  <Col md={6} sm={12} lg={4}>
                    <div className="mb-3">
                      <label className="form-label">
                        Occupation <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select "
                        id="sex"
                        required
                        onChange={(e) => setOccupation(e.target.value)}
                        value={occupation}>
                        <option value="">
                          &hellip; Choose an option &hellip;
                        </option>
                        {/* <option> Select Your Gender</option> */}
                        <option value="Student"> Student</option>
                        <option value="Employee"> Employee</option>
                        <option value="Others"> Others</option>
                      </select>
                    </div>
                  </Col>
                
                  {/*marital status */}
                  <Col md={6} sm={12} lg={4}>
                    <div className="mb-3">
                      <label className="form-label">
                        Marital Status <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select "
                        
                        required
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}>
                        <option value="">
                          &hellip; Choose an option &hellip;
                        </option>
                        {/* <option> Select Your Gender</option> */}
                        <option value="Single"> Single</option>
                        <option value="Husband"> Husband</option>
                        <option value="Wife"> Wife</option>
                        <option value="Widow"> Widow</option>
                      </select>
                    </div>
                  </Col>
                
                  {/* date of birth */}
                  <Col md={6} sm={12} lg={4}>
                    <div className="mb-3">
                      <label className="form-label">
                        Date of Birth <span className="text-danger">*</span>
                      </label>
                      <input type="date" id="dob" className="form-control" value={dob} onChange={(e)=>setDob(e.target.value)} />
                    </div>
                  </Col>
                  {/* place of birth */}
                  <Col md={6} sm={12} lg={4}>
                    <div className="mb-3">
                      <label className="form-label">
                        Place of Birth <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="pob"
                        className="form-control"
                        // placeholder="Place of Birth"
                        value={pob}
                        onChange={(e)=>setPob(e.target.value)}
                      />
                    </div>
                  </Col>
             <Col md={6} sm={12} lg={4}>
                <div className="mb-3">
                  <label className="form-label">
                    Applicant Image <span className="text-danger">*</span>
                  </label>
                  <Input
                    type="file"
                    name="image"
                    accept="image/png, image/gif, image/jpeg, image/jpg"
                    onChange={handleImage}
                    
                    // onChange={(e) => {
                    //   const file = e.target.files[0];
                    //   const reader = new FileReader();
                    //   reader.readAsDataURL(file);
                    //   reader.onload = () => {
                    //     setImage(reader.result);
                    //   };
                    // }}
                  />
                </div>
              </Col>
              <Col md={6} sm={12} lg={5} >
                <div className="mb-2" >
                  {image && (
                    <img
                      className="mt-3"
                      src={image}
                      alt="Applicant"
                      style={{ width: "200px", height: "200px" }}
                    />
                  )}
                </div>
              </Col>
              {/* <Col md={6} sm={12} lg={5} >
                <div className="mb-2 border border-gray-500 border-3" style={{width:"210px",height:"210px"}}>
                  
                  {finger_data?.img && (
                    <>
                      <img src={finger_data?.img}  alt=""  style={{width:"200px",height:"200px"}} />
                    </>
                  )}
                </div>
                <button type="button" onClick={scanFinger} className="btn btn-success">Scan</button>
              </Col> */}
                </Row>

                {/* contact information */}
                <Row className="shadow-lg b-3">
                <legend  className="text-center my-3">Contact Information</legend>
                  {/* Contact Number */}
                  <Col md={6} sm={12} lg={6}>
                    <div className="mb-2">
                      <Label htmlFor="contactNumber" className="form-label">
                        Contact Number
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="contactNumber"
                        type="text"
                        value={phoneNumber}
                        onChange={(e)=>setPhoneNumber(e.target.value)}
                        // placeholder="Contact Number"
                        required
                      />
                    </div>
                  </Col>
                  {/* Email */}
                  <Col md={6} sm={12} lg={6}>
                    <div className="mb-2">
                      <Label htmlFor="email" className="form-label">
                        Contact Email
                      </Label>
                      <Input
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        // placeholder="Contact Email"
                        
                      />
                    </div>
                  </Col>
                  {/* emergency contact name */}
                  <Col md={6} sm={12} lg={6}>
                    <div className="mb-2">
                      <Label htmlFor="emergencyContactName" className="form-label">
                        Emergency Contact Name
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="emergencyContactName"
                        type="text"
                        value={emergencyContactName}
                        onChange={(e)=>setEmergencyContactName(e.target.value)}
                        // placeholder="Emergency Contact Name"
                        required
                      />
                    </div>
                  </Col>
                  {/* Emergency Contact Number */}
                  <Col md={6} sm={12} lg={6}>
                    <div className="mb-2">
                      <Label htmlFor="emergencyContactNumber" className="form-label">
                        Emergency Contact Number
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="emergencyContactNumber"
                        type="Number"
                        value={emergencyContactNumber}
                        onChange={(e)=>setEmergencyContactNumber(e.target.value)}
                        // placeholder="Emergency Contact Number"
                        required
                      />
                    </div>
                  </Col>
             
                </Row>
                
                 {/* Passport information */}
                 <Row className="shadow-lg b-3">
                <legend  className="text-center my-3">Passport Information</legend>
                  
                 {/* type of passport application */}
                 <Col md={6} sm={12} lg={4}>
                    <div className="mb-3">
                      <label className="form-label">
                        Passport Type Application <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select "
                        disabled
                        required
                        onChange={(e) => setState(e.target.value)}
                        value={state}>
                        {/* <option value="">
                          &hellip; Choose an option &hellip;
                        </option> */}
                        {/* <option> Select Your passport </option> */}
                        <option value="newPassport" selected readOnly> New Application</option>
                      </select>
                    </div>
                  </Col>
                  {/* passport type */}
                  <Col md={6} sm={12} lg={4}>
                    <div className="mb-3">
                      <label className="form-label">
                        Passport Type <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select "
                        disabled
                        required
                        onChange={(e) => setState(e.target.value)}
                        value={state}>
                        {/* <option value="">
                          &hellip; Choose an option &hellip;
                        </option> */}
                        {/* <option> Select Your passport </option> */}
                        <option value="Ordinary" selected disabled>Ordinary </option>
                      </select>
                    </div>
                  </Col>
            
                  {/* amount */}
                  <Col md={6} sm={12} lg={4}>
                    <div className="mb-2">
                      <Label htmlFor="amount" className="form-label">
                        Amount
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="amount"
                        type="Number"
                        // placeholder="Amount"
                        value={150}
                        required
                        disabled
                      />
                    </div>
                  </Col>
                </Row>

                {/* appointment information */}
                <Row>
                <legend  className="text-center my-3">Appointment Information</legend>
                {/* <Col md={6} sm={12} lg={6}>
                    <div className="mb-3">
                      <label className="form-label">
                        Regions <span className="text-danger">*</span>
                      </label>
                      <Select
                        className=""
                        options={"options"}
                        value={"selectedOptions"}
                        // onChange={}
                />
                    </div>
                  </Col>
                <Col md={6} sm={12} lg={6}>
                    <div className="mb-3">
                      <label className="form-label">
                        Regions <span className="text-danger">*</span>
                      </label>
                      <Select
                        className=""
                        options={"options"}
                        value={"selectedOptions"}
                        // onChange={}
                />
                    </div>
                  </Col> */}

                  <Col md={6} sm={12} lg={4}>
                    <div className="mb-2">
                      <Label htmlFor="amount" className="form-label">
                        Appointment Date
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="appointmentDate"
                        type="text"
                        // placeholder="Amount"
                        value={appointmentDate}

                        required
                        disabled
                      />
                    </div>
                  </Col>
                  <Col md={6} sm={12} lg={4}>
                    <div className="mb-2">
                      <Label htmlFor="appointmentTime" className="form-label">
                        Appointment Time
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="appointmentTime"
                        type="text"
                        // placeholder="Amount"
                        value={appointmentTime}
                        required
                        disabled
                      />
                    </div>
                  </Col>
                </Row>
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
                    id="add-btn">
                    {isEditing ? "Update" : "Save"}
                  </button>
                </div>
              </ModalFooter>
            </form>
          </Modal>
  
          {/* approve */}
              
          <Modal
            isOpen={approveModalList}
            toggle={() => {
              tog_list();
            }}
            centered
            size="lg"
            backdrop={"static"}>
            <div className="bg-light p-3 modal-header">
              <h5 className="modal-title">
                {" "}
                {isEditing ? "Approve Applicant" : "Add New Applicant"}{" "}
              </h5>

              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  setApproveModalList(false);
               }}
                aria-label="Close"></button>
            </div>
            <form onSubmit={handleApproveApplicant}>
              <ModalBody>
               <Row>
              <Col md={6} sm={12} lg={4}>
                    <div className="mb-2">
                      <Label htmlFor="nID" className="form-label">
                       Enter Applicant National ID
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="nID"
                        type="Number"
                        placeholder="National ID"
                        value={passNid}
                        onChange={(e)=>setPassNid(e.target.value)}
                        required
                        
                      />
                    </div>
              </Col>
              <Col md={6} sm={12} lg={4}>
                    <div className="mb-2">
                      <Label htmlFor="passNumber" className="form-label">
                       Enter Applicant Phone Number
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="passNumber"
                        type="Number"
                        placeholder="Phone Number"
                        value={passPhoneNumber}
                        onChange={(e)=>setPassPhoneNumber(e.target.value)}
                        
                        
                      />
                    </div>
              </Col>
              <Col md={6} sm={12} lg={4}>
                    <div className="mt-4">
                    <button
                    type="button"
                    onClick={getApplicantInfo}
                    className="btn btn-success"
                    id="update-btn">
                    GET APPLICANT
                  </button>
                    </div>
              </Col>
              </Row>
              <Row>
              <Col md={6} sm={12} lg={4}>
                    <div className="my-3">
                    <Input type="file" name="image" onChange={(e) => setFile(e.target.files[0])} />
                   
                   </div>

              </Col>
              <Col md={6} sm={12} lg={4}>
                    <div className="mt-4">
                    <button
                    type="button"
                    onClick={handleChangeBg}
                    className="btn btn-success"
                    id="update-btn">
                    REMOVE BACKGROUND
                  </button>
                    </div>
              </Col>
              </Row>
              <Row>
                <Col md={6} sm={12} lg={5}>
                  <div className="mb-2">
                  {file && <img className="mt-3" src={URL.createObjectURL(file)} style={{ width: "400px", height: "400px",  }} />}
                  </div>
                </Col>
                <Col md={6} sm={12} lg={5}>
                  <div className="mb-2">
                  {bgRemove && <img className="mt-3" src={bgRemove} style={{ width: "400px", height: "400px", marginLeft:"80px"  }} />}
                  </div>
                </Col>
              </Row>
              </ModalBody>

              <ModalFooter>
                <div className="hstack gap-2 justify-content-end">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => setApproveModalList(false)}
                    >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success"
                    id="add-btn">
                    Approve Applicant
                  </button>
                </div>
              </ModalFooter>
            </form>
          </Modal>
          
        </div>
      </React.Fragment>
    );
  };
  
  export default ApproveApplicants;
  

//   import { useState } from "react";
// import "./styles.css";

// export default function App() {
//   const [image, setImage] = useState("");
//   const [bgRemove, setBgRemove] = useState("");

//   const handleChangeBg = async () => {
//     const apiKey = "77i7YWurRk3wxLQW2MfrMkd4";
//     const url = "https://api.remove.bg/v1.0/removebg";
//     const formData = new FormData();
//     formData.append("image_file", image, image.name);
//     formData.append("size", "auto");
//     formData.append("width", "600px");
//     formData.append("height", "600px");

//     fetch(url, {
//       method: "POST",
//       headers: {
//         "X-Api-key": apiKey
//       },
//       body: formData
//     })
//       .then((res) => res.blob())
//       .then((blob) => {
//         const reader = new FileReader();
//         reader.onloadend = () => setBgRemove(reader.result);
//         reader.readAsDataURL(blob);
//          console.log("Removed background image size:", blob.size);
//       })
//       .catch((err) => console.error(err));
//   };
  
//   return (
//     <div className="flex justify-center my-10">
//       <div>
//         <h2 className="text-lg text-semibold">REMOVE BACKGROUND IMAGE</h2>
//         <div className="form-group m-4">
//           <input
//             type="file"
//             className="form-control"
//             onChange={(e) => setFile(e.target.files[0])}
//           />
//         </div>
//         <div className="form-group m-4">
//           <button onClick={handleChangeBg} className="btn btn-primary">
//             REMOVE BACKGROUND{" "}
//           </button>
//         </div>
//         <div className="mt-1 pl-5">{bgRemove && <img src={bgRemove} />}</div>
//       </div>
//     </div>
//   );
// }
