import moment from "moment";
import React, {
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Select from "react-select";
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
import { LoginContext } from './../../Components/Context/loginContext/LoginContext';
import "./styleEmp.css";


const EmployeeRegistration = () => {
  const {
    EmployeeRegister, getEmployees, fetchEmployees,fetchStates,districts,selectedState,districtData,fetchSelectedState,fetchSingleDistrict,
    updateEmployee
   
  } = useContext(LoginContext);
  
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
  const [image, setImage] = useState([]);
  const [checked, setChecked] = useState(true);

  const [Disable, setDisable] = useState(true);
  const [HasSite, setHasSite] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [object_id, setObject] = useState();
  const [modal_list, setmodal_list] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedStateId, setSelectedState] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOptions2, setSelectedOptions2] = useState([]);
  const [stateName, setStateName] = useState("");
  const [stateId, setStateId] = useState("");
  useEffect(()=>{
    fetchEmployees()
    fetchStates()
  },[])
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
          // isActive: status == "Active"? true : false,
          empPhone: employeePhone,
          sex:sex,
          districtId:selectedStateId,
          image:image
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

        console.log(data);
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
          // isActive: status == "Active"? true : false,
          empPhone: employeePhone,
          sex:sex,
          districtId:selectedStateId,
          image:image
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
          id:EmployeeId,
          empName: employeeName,
          isManager: empType == "Manager"? true : false,
          // isActive: status == "Active"? true : false,
          empPhone: employeePhone,
          sex:sex,
          image:image
        };
        console.log(data);
        updateEmployee(data);
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
          id:EmployeeId,
          empName: employeeName,
          isManager: empType == "Manager"? true : false,
          // isActive: status == "Active"? true : false,
          empPhone: employeePhone,
          sex:sex,
          image: image
        };
        console.log(data);
        updateEmployee(data);
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
    setmodal_list(true);
    setSelectedState(data.districtId);
    setEmployeeId(data._id);
    setEmployeeName(data.empName);
    setImage(data.image);
    setSex(data.sex);
    setEmployeePhone(data.empPhone);
    // setEmpType(data.isManager);
    // setStatus(data.isActive);
    const isManager1 = data.isManager ? "manager":"employee";
    setEmpType(isManager1)
    setImage(data?.image.url)


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
    setEmployeeId(data);
    
  };
console.log(districts);
  document.title = "Employee Registration  ";
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
      // {
      //   Header: "Status",
      //   accessor: (row) => (row.isActive ? "Active" : "In Active"),
      //   filterable: true,
      // },
     
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
                <CardBody>
                  <div id="Purchasestable">
                    <Row className="g-4 mb-3"></Row>
                    
                    <TableContainer
                      columns={columns}
                      data={getEmployees || []}
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
              <Col md={6} sm={12} lg={4} >
                <div className="mb-2">
                  {image && (
                    <img
                     
                      className="mt-3"
                      src={image}
                      alt="Applicant"
                      style={{ width: "200px", height: "200px",borderRadius:"50%", border:"3px solid gray" }}
                    />
                  )}
                </div>
              </Col>
              </Row>
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
                  <div className="input-group mb-3">
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
                      <option value="manager">Manager</option>
                      <option Value="employee">Employee</option>
                    </select>
                  </div>
                </Col>
              </Row>
             

              <Row>
                {/* <Col lg={4} md={6} sm={12}>
                  <div className="input-group my-4">
                    <Label
                      className="input-group-text"
                      htmlFor="inputGroupSelect01">
                      Status
                    </Label>
                    <select className="form-select" id="inputGroupSelect01" name="status" value={status} onChange={(e)=> setStatus(e.target.value)}>
                      <option>Status...</option>
                      <option Value="Active">Active</option>
                      <option Value="inActive">In Active</option>
                    </select>
                  </div>
                </Col> */}
                <Col lg={4} md={6} sm={12}>
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
