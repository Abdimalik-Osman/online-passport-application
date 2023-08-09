import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Select from "react-select";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  Row,
  Spinner
} from "reactstrap";

// action
import { resetRegisterFlag } from "../../store/actions";

//redux
import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router-dom";
// import BreadCrumb from '../../../Components/Common/BreadCrumb';
//Import Flatepicker

// Import Images

import BreadCrumb from "../../Components/Common/BreadCrumb";
import { LoginContext } from './../../Components/Context/loginContext/LoginContext';


const CreateUser = () => {
  const history = useHistory();
  const [userName, setUsername] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [employeeId, setEmployeeId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [changePassword, setChangePassword] = useState("No");
  const [showPassword, setShowPassword] = useState(true);
  const [modal_list, setmodal_list] = useState(false);
  const [id, setId] = useState("");
  const [checked, setChecked] = useState(true);
  const [state, setState] = useState(true);
  const [selectedStateId, setSelectedState] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOptions2, setSelectedOptions2] = useState([]);
  const [stateName, setStateName] = useState("");
  const [empDistrict, setEmpDistrict] = useState("");
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
    UpdateUser,User,userLoading,fetchStates,districts,selectedState,districtData,fetchSelectedState,fetchSingleDistrict
  } = useContext(LoginContext);
  console.log(changePassword);
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
  const options =  districts?.map((item) => ({
    value: item?.districtInfo[0]?._id,
    label: item?.stateName,
  }));
  console.log(selectedState)
  const options2 =
    selectedState?.length > 0 &&
    selectedState?.map((item) => ({
      value: item?._id,
      label: item?.districtName,
    }));
  const handleChange1 = (selected) => {
    setSelectedOptions(selected);
    // setStateId(selected.value);
    console.log(selected.value)
    // dispatch(getSingleDistrict(selected.value));
    fetchSingleDistrict(selected.value)
    setStateName(selected.label);
    setSelectedOptions2([]);
  };
  const handleChange2 = (selected) => {
    setSelectedOptions2(selected);

    // dispatch(getDistrictInfo(selected.value));
    fetchSelectedState(selected.value)
    setSelectedState(selected.value);
    setDistrictName(selected?.label);
    // dispatch(getDistrictWorkingHours(selected.value));

    // dispatch(getUnavailableDates(selected.value));
  };
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
    fetchStates()
  }, []);

  console.log(getEmployees);
  console.log(allUsers);

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
      if (!userName || !password ||  !role || !employeeId) {
        showToastMessage("Please provide the required values");
      }

      const data = {
        username: userName,
        password: password,
        isAdmin: role == "Yes" ? true : false,
        empId: employeeId?.value,
        districtId:employeeId?.districtId,
        // phoneNumber: phoneNumber,
        status:state
      };
      // console.log(data)
      registerUser(data);
      setEmployeeId("");
      setState("")
      e.target.reset();
    }
    if (isEditing == true) {
      e.preventDefault();
      if (!userName ||  !role || !employeeId) {
        showToastMessage("Please provide the required values");
      }
      // if (changePassword == "Yes" && password.length > 2) {
      //   showToastMessage("Please provide the password");
      // }
      const data = {
        username: userName,
        password: password,
        isAdmin: role == "Yes" ? true : false,
        empId: employeeId?.value,
        districtId:employeeId?.districtId,
        status:state,
        // status: changePassword == "Yes" ? true : false,
        id: id,
      };
      UpdateUser(data);
      setState("")
      // setEmployeeId("");
      e.target.reset();
      console.log(data);
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
      selector: (row) => row.status 
    },
    {
      name: <h6 style={{ fontWeight: "bold" }}> Actions</h6>,
      cell: (row) => (
        <>
          <i
            style={{ cursor: "pointer" }}
            className="text-primary ri-pencil-fill fs-16 mx-3 fx-3"
            onClick={() => editUser(row)}
          ></i>{" "}
         
        </>
      ),

     
    },
    {
      
    },
  ];
  const handleEmployeeChange = (choice) => {
    setEmployeeId(choice);
    setEmpDistrict(choice.districtId);
    // console.log(choice.districtId)
  };
  const Emp = [];
  
  for (let i = 0; i < getEmployees?.length; i++) {
    // console.log(setEmployeeId[i]._id);

    var dropdownList = {
      districtId:getEmployees[i].districtId,
      value: getEmployees[i]._id,
      label: ` ${getEmployees[i].empName}`,
    };

    Emp.push(dropdownList);
  }

  console.log(employeeId);

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
    setUsername("");
    setRole("");
    // setPhoneNumber("");
    setChecked(true);
  };
  const editUser = (row) => {
    setIsEditing(true);
    tog_list();
    console.log(row);
    console.log(row?.emp?.empName);
    setEmployeeId({ lable: row?.emp?.empName, value: row?.emp?._id });
    setUsername(row?.username);
    setRole(row?.isAdmin == true ? "Yes" : "No");
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

  console.log(checked);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Create Users" pageTitle="Setting" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-3">
                    <Col className="col-sm-auto">
                      <div>
                        {<ToastContainer />}
                        <div>
                          <subHeaderComponentMemo />
                          <h4 className="card-title mb-0">Add User</h4>
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
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                            Add
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>

                <CardBody>
                  <Row className="g-4 mb-3"></Row>

                  <div id="customerList">
                    {allUsers.length > 0 && (
                      <DataTable
                        columns={columns}
                        data={filteredItems}
                        pagination
                        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                        subHeader
                        subHeaderComponent={subHeaderComponentMemo}
                        // selectableRows
                        persistTableHead

                        progressPending={userLoading  }
                        progressComponent={<SpinnerBorder />}
                        // sortFunction={customSort}
                      />
                    )}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* end of container */}

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
              <h5 className="modal-title">
                {" "}
                {isEditing ? "update User" : "Add New Item"}{" "}
              </h5>

              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  closeModalMuscab();
                }}
                aria-label="Close"
              ></button>
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
                  <Col md={4}>
                    <div className="mb-3">
                      <label className="form-label">
                        Employee <span className="text-danger">*</span>
                      </label>

                      <div>
                        <Select
                          // className="bg-white"
                          options={Emp}
                          onChange={(choice) => handleEmployeeChange(choice)}
                          value={Emp?.filter(function (option) {
                            // console.log(option)
                            // setEmpDistrict(option.districtId)
                            
                            return option.value === employeeId.value 
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
                  </Col>

                  <Col md={4}>
                    <div className="mb-3">
                      <Label htmlFor="username" className="form-label">
                        Username <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="username"
                        type="text"
                        placeholder="Enter username"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                        value={userName}
                      />
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="mb-3">
                      <label className="form-label">
                        Role <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select "
                        id="itemtype"
                        required
                        onChange={(e) => setRole(e.target.value)}
                        value={role}
                      >
                        <option value="">&hellip; Is Admin ? &hellip;</option>
                        <option value="Yes"> Yes</option>
                        <option value="No"> No</option>
                      </select>
                    </div>
                  </Col>
                
                  <Col md={4}>
                    <div className="mb-3">
                      <label className="form-label">
                        State <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select "
                        id="itemtype"
                        required
                        onChange={(e) => setState(e.target.value)}
                        value={state}
                      >
                   <option value="">&hellip; Choose an option &hellip;</option>
                        <option value="Active"> Active</option>
                        <option value="InActive"> InActive</option>
                      </select>
                    </div>
                  </Col>
                  {isEditing == false && (
                    <Col md={4}>
                      <div className="mb-3">
                        <Label htmlFor="userpassword" className="form-label">
                          Password <span className="text-danger">*</span>
                        </Label>
                        <Input
                          name="password"
                          type="password"
                          placeholder="Enter Password"
                          required
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </Col>
                  )}

                  {modal_list == true && isEditing == true && (
                    // <Col md={4}>
                    //   <div className="mb-3">
                    //     <Label htmlFor="userpassword" className="form-label">
                    //       Change password <span className="text-danger">*</span>
                    //     </Label>
                    //     <select
                    //       className="form-select "
                    //       id="inputGroupSelect04"
                    //       onChange={(e) => {
                    //         setChangePassword(e.target.value);
                    //         // setShowPassword(true);
                    //       }}
                    //       // value={chanlPckge}
                    //     >
                    //       <option value="Yes">Yes</option>
                    //       <option value="No" selected>
                    //         No
                    //       </option>
                    //     </select>
                    //   </div>
                    // </Col>
                    <Col md={4}>
                      <div
                        className="form-check form-switch form-switch-lg mb-3 mt-3"
                        style={{
                          display: "flex",
                          // flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ marginTop: "7%", float: "right" }}>
                          change password
                        </div>

                        <Input
                          style={{ marginTop: "9%" }}
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="ISCash"
                          onChange={(e) => {
                            // setChangePassword(e.target.value);
                            // console.log(e.target);
                            // setShowPassword(true);
                            handleChange();
                          }}
                        />
                      </div>
                    </Col>
                  )}

                  {changePassword == "Yes" && (
                    <Col md={4}>
                      <div className="mb-3">
                        <Label htmlFor="userpassword" className="form-label">
                          Password <span className="text-danger">*</span>
                        </Label>
                        <Input
                          name="password"
                          type="password"
                          placeholder="Enter Password"
                          required
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </Col>
                  )}
                  {/* <Col md={4}>
                          <div className="mb-2">
                            <Label
                              htmlFor="confirmPassword"
                              className="form-label"
                            >
                              Confirm Password{" "}
                              <span className="text-danger">*</span>
                            </Label>
                            <Input
                              name="confirm_password"
                              type="password"
                              placeholder="Confirm Password"
                              required
                            />
                          </div>
                        </Col> */}
                        {/* <Col lg={4} md={6} sm={12}>
                    <div className="my-2">
                      <label className="form-label">
                       Select State <span className="text-danger">*</span>
                      </label>
                      <Select
                        className=""
                        options={options}
                        value={selectedOptions}
                        onChange={handleChange1}
                        // onChange={}
                />
                    </div>
                  </Col>
                <Col lg={4} md={6} sm={12}>
                    <div className="my-2">
                      <label className="form-label">
                        Regions <span className="text-danger">*</span>
                      </label>
                      <Select
                        className=""
                        options={options2}
                        value={selectedOptions2}
                        onChange={handleChange2}
                        // onChange={}
                />
                    </div>
                  </Col> */}
                </Row>
              </ModalBody>

              <div className="mb-4"></div>

              <ModalFooter>
                <div className="hstack gap-2 justify-content-end">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => closeModalMuscab()}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success"
                    id="add-btn"
                  >
                    {isEditing ? "Update" : "Save"}
                  </button>
                </div>
              </ModalFooter>
            </form>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CreateUser;
const SpinnerBorder = () => {
  return <Spinner className="my-2 text-center" />;
};
