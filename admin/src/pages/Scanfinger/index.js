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
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  Progress,
  Row
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainer";
import "../Employee/styleEmp.css";
import { CallSGIFPGetData } from "../services/biometricFun";
import { LoginContext } from './../../Components/Context/loginContext/LoginContext';
  
  const ScanFinger = () => {
    const {
      EmployeeRegister, getEmployees, fetchEmployees,   fetchUnapprovedApplicants,fetchSingleUnapprovedApplicant,applicantInfo,
      unapprovedApplicants, updateApplicantInfo, uploadImage,scanFingerApp,getAllApprovedApplicants,approvedApplicants,GetApprovedApplicants,allApproved
     
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
    const [suspected, setSuspected] = useState();
  
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
    const [matchScore, setIsMatchScore] = useState();
    const [bgRemove, setBgRemove] = useState("");
    const [finger_data, setFinger_data] = useState({
      template: "",
      
      img: "",
      
      quality: "",
      
    });
    const [acknow_id, setAcknow_id] = useState("");
    const [acknowModel, setAcknowModel] = useState(false);
    const [foundedApp, setFoundedApp] = useState();
    const myItemString = localStorage.getItem('user');
    const user = JSON.parse(myItemString);
    const district = user?.data.districtId;
    const userId = user?.data._id;
    const data = {
      districtId:district,
      userId:userId
    }
    useEffect(()=>{
      GetApprovedApplicants()
      // console.log(foundedApp)
      fetchUnapprovedApplicants(data)
    },[])
    // console.log("this is the match score ",matchScore);
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
  // console.log(approvedApplicants)
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
    document.title = "Scan Finger Applicants";
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
    
      console.log(matchScore);
      if(finger_data.quality <= 70){
       return toast.error("Your finger quality is too low or too poor, please try again")
      }
      if(matchScore > 90){
        
        return toast.error("these fingers looks like same person, please try again")
      }
        let img = finger_data
      console.log(img,id)
        scanFingerApp(img,id)
        setmodal_list(false);
        GetApprovedApplicants()
        fetchUnapprovedApplicants(data)
        
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
    //   console.log(image)
    //   const formData = new FormData();
    //   formData.append('image', image);
    //   scanfingerApp(image)


    }

    const scanFingerprint = () => {
      setFoundedApp()
      setIsMatchScore()
      setFinger_data({
        template: "",
        
        img: "",
        
        quality: "",
        
      });
      CallSGIFPGetData(
        setFinger_data,
        setIsMatchScore,
        allApproved,
        setFoundedApp
      )
      
    }
   
    // console.log(finger_data)
    // console.log("suspected applicant",suspected);
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Helmet>
              <script src="html2pdf.bundle.min.js"></script>
            </Helmet>
            <BreadCrumb
              title="Scan Finger Applicants"
              pageTitle="Scan Finger Applicants"
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
                            <h4 className="card-title mb-0">Scan Finger Applicants</h4>
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
              
              

                {/*personal information  */}
                <Row>
                <legend  className="text-center">Scan Finger print</legend>
              
              <Col md={6} sm={12} lg={5} >
                <div className="mb-2 border border-gray-500 border-3" style={{width:"210px",height:"210px"}}>
                <div>
                  <Progress value={finger_data.quality} color={finger_data.quality <= 50?"danger":"success"} className="animated-progess custom-progress progress-label" ><div className="label">{finger_data.quality}%</div> </Progress>
                </div>
                  {finger_data?.img && (
                    <>
                      <img src={finger_data?.img}  alt=""  style={{width:"200px",height:"200px"}} />
                    </>
                  )}
                </div>
                <button type="button" onClick={scanFingerprint} className="btn btn-success mt-2 px-5">Scan</button>
              </Col>
              <Col md={6} sm={12} lg={5} >
                <div className="mb-2 border border-gray-500 border-3" style={{width:"210px",height:"210px"}}>
               
                  {foundedApp?.fingerPic && (
                    <>
                      <img src={foundedApp?.fingerPic?.url}  alt=""  style={{width:"200px",height:"200px"}} />
                    </>
                  )}
                  <span><b>{foundedApp?.fullname}</b></span>
                 {foundedApp?.image?.url && <img src={foundedApp?.image?.url} className="mx-5"  style={{width:"60px",height:"60px"}}/>}
                </div>
                {/* <button type="button" onClick={scanFingerprint} className="btn btn-success mt-2 px-5">Scan</button> */}
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
                    {isEditing ? "Approve" : "Save"}
                  </button>
                </div>
              </ModalFooter>
            </form>
          </Modal>
  
          {/* approve */}
     
          
        </div>
      </React.Fragment>
    );
  };
  
  export default ScanFinger;
  

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
