import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import DataTable from "react-data-table-component";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  Row,
  Spinner,
  UncontrolledDropdown,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// action
import { registerUser, apiError, resetRegisterFlag } from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link, useHistory } from "react-router-dom";
import moment from "moment";
// import BreadCrumb from '../../../Components/Common/BreadCrumb';
import SimpleBar from "simplebar-react";
//Import Flatepicker
import Flatpickr from "react-flatpickr";

// Import Images

import BreadCrumb from "../../Components/Common/BreadCrumb";
import { LoginContext } from "./../../Components/Context/loginContext/LoginContext";

import { Grid, _ } from "gridjs-react";

const CreateApplicant = () => {
  const history = useHistory();
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
  const [appointmentDate, setzppointmentDate] = useState();
  const [appointmentTime, setAppointmentTime] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [employeeId, setEmployeeId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [changePassword, setChangePassword] = useState("No");
  const [nationalId, setNationalId] = useState("");
  const [modal_list, setmodal_list] = useState(false);
  const [id, setId] = useState("");
  const [checked, setChecked] = useState(true);
  const [state, setState] = useState(true);
  // const [nId, setId] = useState();
  const [selectedSex, setSelectedSex] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOptions2, setSelectedOptions2] = useState([]);
  const [selectedId, setSelectedId] = useState("");
   const [selectedTime, setSelectedTime] = useState("");
   const [selectedState1, setSelectedState] = useState("");
  const [step, setStep] = useState(1);
  let [amount,setAmount] = useState("150")
  
  const tog_list = () => {
    setmodal_list(!modal_list);
  };

  const [modal_delete, setmodal_delete] = useState(false);
  const tog_delete = () => {
    setmodal_delete(!modal_delete);
  };

  const dispatch = useDispatch();
  const {
    registerUser,
    name,
    GetByIdEmployee,
    getAllUsers,
    allUsers,
    getEmployees,
    fetchEmployees,
    isLoading,
    UpdateUser,
    User,
    userLoading, nationalID,availableDates,workingHours,districtData,
    selectedState,districts,   fetchNationalId,
    fetchAvailableDates,
    fetchSelectedState,
    fetchWorkingHours,
    fetchSingleDistrict,
    fetchStates
  } = useContext(LoginContext);
  // console.log(changePassword);
  const { error, registrationError, success } = useSelector((state) => ({
    registrationError: state.Account.registrationError,
    success: state.Account.success,
    error: state.Account.error,
  }));
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  let userId = User?.data?.user?._id || User?.user?._id;
  const filteredItems = allUsers?.filter(
    (item) =>
      item.username &&
      item.username.toLowerCase().includes(filterText.toLowerCase())
  );
  // console.log(filteredItems);
  // console.log(filterText);
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

  useEffect(() => {
    getAllUsers();
    fetchEmployees();
  }, []);

  // console.log(getEmployees);
  // console.log(allUsers);

  useEffect(() => {
    if (success) {
      setTimeout(() => history.push("login"), 3000);
    }

    setTimeout(() => {
      dispatch(resetRegisterFlag());
    }, 3000);
  }, [dispatch, success, error, history]);
  const showToastMessage = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const handleSubmit = (e) => {
    if (isEditing == false) {
      e.preventDefault();
      // if (!userName || !password || !role || !employeeId) {
      //   showToastMessage("Please provide the required values");
      // }

      // const data = {
      //   username: userName,
      //   password: password,
      //   isAdmin: role == "Yes" ? true : false,
      //   empId: employeeId?.value,

      //   // phoneNumber: phoneNumber,
      //   status: state,
      // };
      // registerUser(data);
      setEmployeeId("");
      setState("");
      e.target.reset();
    }
    if (isEditing == true) {
      e.preventDefault();
      // if (!userName || !role || !employeeId) {
      //   showToastMessage("Please provide the required values");
      // }
      // if (changePassword == "Yes" && password.length > 2) {
      //   showToastMessage("Please provide the password");
      // }
      // const data = {
      //   username: userName,
      //   password: password,
      //   isAdmin: role == "Yes" ? true : false,
      //   empId: employeeId?.value,
      //   // phoneNumber: phoneNumber,
      //   state: state,
      //   status: changePassword == "Yes" ? true : false,
      //   id: id,
      // };
      // UpdateUser(data);
      setState("");
      // setEmployeeId("");
      e.target.reset();
      // console.log(data);
      setmodal_list(false);
    }
  };
  const columns = [
    // {
    //   name: <h6 style={{ fontWeight: "bold" }}> Name</h6>,
    //   selector: (row) => row.emp?.empName,
    // },

    {
      name: <h6 style={{ fontWeight: "bold" }}> Username</h6>,
      selector: (row) => row.username,
    },
    {
      name: <h6 style={{ fontWeight: "bold" }}> Is Admin</h6>,
      selector: (row) => (row.isAdmin == true ? "Yes" : "No"),
    },
    // {
    //   name: <h6 style={{ fontWeight: "bold" }}> Phone </h6>,
    //   selector: (row) => row.phoneNumber,
    // },
    {
      name: <h6 style={{ fontWeight: "bold" }}> Status</h6>,
      selector: (row) => row.status,
    },
    {
      name: <h6 style={{ fontWeight: "bold" }}> Actions</h6>,
      cell: (row) => (
        <>
          <i
            style={{ cursor: "pointer" }}
            className="text-primary ri-pencil-fill fs-16 mx-3 fx-3"
            onClick={() => editUser(row)}></i>{" "}
        </>
      ),
    },
    {},
  ];

  const Emp = [];

  for (let i = 0; i < getEmployees?.length; i++) {
    // console.log(setEmployeeId[i]._id);

    var dropdownList = {
      value: getEmployees[i]._id,
      label: ` ${getEmployees[i].empName}`,
    };

    Emp.push(dropdownList);
  }

  // console.log(Emp);

  const sortedUsers = [];
  for (let i = 0; i < allUsers?.length; i++) {
    let singleArr = [
      allUsers[i]?.emp?.empName,
      allUsers[i]?.username,
      allUsers[i].isAdmin == true ? "Yes" : "No",
      allUsers[i].status,
      //   allUsers[i].phoneNumber,
      allUsers[i]._id,
    ];

    sortedUsers.push(singleArr);
  }
  const addModal = () => {
    tog_list();
    setEmployeeId("");
    // setUsername("");
    // setRole("");
    // setPhoneNumber("");
    setChecked(true);
  };
  const editUser = (row) => {
    setIsEditing(true);
    tog_list();
    // console.log(row);
    // console.log(row?.emp?.empName);
    setEmployeeId({ lable: row?.emp?.empName, value: row?.emp?._id });
    // setUsername(row?.username);
    // setRole(row?.isAdmin == true ? "Yes" : "No");
    // setPhoneNumber(row?.phoneNumber);
    setId(row._id);
  };

  const closeModalMuscab = () => {
    setmodal_list(false);
    setChangePassword("No");
    setIsEditing(false);
    setChecked(true);
  };

  const handleChange = () => {
    setChecked(!checked);
    setChangePassword(checked ? "Yes" : "No");
  };

  let mFirstName = "";
  let mLastName = "";
  let firstName = "";
  let lastName = "";
  // console.log(checked);
  const checkNationalId = async() => {
    fetchNationalId(nationalId)
    
   
  
      const text = nationalID?.fullName;
      const fullname = text?.split(" ");
      const motherName = nationalID?.motherName;
      const motherFullname = motherName?.split(" ");

      const fname = fullname?.[0];
      const secondName = fullname?.[1];
      firstName = fname?.concat(" ", secondName);
      lastName = fullname?.[2];
      // ----------------
      const mFname = motherFullname?.[0];
      const mSecondName = motherFullname?.[1];
      mFirstName = mFname?.concat(" ", mSecondName);
      mLastName = motherFullname?.[2];
      const defaultSex = (await nationalID?.sex) === "Male" ? "Male" : "Female";
      setSelectedSex(defaultSex);
    
      const apiDate = new Date(nationalID?.DOB);
   // convert date string to date object
     await setSelectedDate(apiDate?.toISOString()?.substr(0, 10));
      setMFname(mFirstName)
      setMLname(mLastName)
      setFname(firstName)
      setLname(lastName)
      setOccupation(nationalID?.occupation)
    
      // setFormData({
      //   ...formData,
      //   fName: firstName,
      //   lName: lastName,
      //   mFname: mFirstName,
      //   mLname: mLastName,
      //   sex: defaultSex,
      //   nID: nId,
      //   dob: apiDate?.toISOString()?.substr(0, 10),
      // });
    }
    


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Create Users" pageTitle="Setting" />
     
          {/* end of container */}

        
            <form onSubmit={handleSubmit}>
            
              
              
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
                <Row>
                <Col md={3}>
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
                  <Col md={4}>
                    <div className="mt-4  w-100">
                      <button
                        type="button"
                        className="btn  btn-primary"
                        onClick={checkNationalId}
                        aria-label="Check">CHECK</button>
                    </div>
                  </Col>
                </Row>
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

                 

                  {/* first name */}
                  <Col md={6} sm={12} lg={3}>
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
                      />
                    </div>
                  </Col>
                  {/* last name */}
                  <Col md={6} sm={12} lg={3}>
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
                      />
                    </div>
                  </Col>
                  {/* mother first name */}
                  <Col md={6} sm={12} lg={3}>
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
                      />
                    </div>
                  </Col>
                  {/* mother Last name */}
                  <Col md={6} sm={12} lg={3}>
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
                        onChange={(e) => setState(e.target.value)}
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
                        onChange={(e) => setState(e.target.value)}
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
                      <input type="date" id="dob" className="form-control" value={selectedDate} />
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
                      />
                    </div>
                  </Col>
                </Row>

                {/* contact information */}
                <Row className="shadow-lg b-3">
                <legend  className="text-center my-3">Contact Information</legend>
                  {/* Contact Number */}
                  <Col md={6} sm={12} lg={3}>
                    <div className="mb-2">
                      <Label htmlFor="contactNumber" className="form-label">
                        Contact Number
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="contactNumber"
                        type="text"
                        // placeholder="Contact Number"
                        required
                      />
                    </div>
                  </Col>
                  {/* Email */}
                  <Col md={6} sm={12} lg={3}>
                    <div className="mb-2">
                      <Label htmlFor="email" className="form-label">
                        Contact Email
                      </Label>
                      <Input
                        name="email"
                        type="email"
                        // placeholder="Contact Email"
                        
                      />
                    </div>
                  </Col>
                  {/* emergency contact name */}
                  <Col md={6} sm={12} lg={3}>
                    <div className="mb-2">
                      <Label htmlFor="emergencyContactName" className="form-label">
                        Emergency Contact Name
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="emergencyContactName"
                        type="text"
                        // placeholder="Emergency Contact Name"
                        required
                      />
                    </div>
                  </Col>
                  {/* Emergency Contact Number */}
                  <Col md={6} sm={12} lg={3}>
                    <div className="mb-2">
                      <Label htmlFor="emergencyContactNumber" className="form-label">
                        Emergency Contact Number
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="emergencyContactNumber"
                        type="Number"
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
                  </Col>
                </Row>
            
            </form>
        
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CreateApplicant;
const SpinnerBorder = () => {
  return <Spinner className="my-2 text-center" />;
};
