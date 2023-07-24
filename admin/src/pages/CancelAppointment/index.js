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

const CancelAppointment = () => {
  const history = useHistory();

  // const [amount, setAmount] = useState();
  const [appointmentDate, setAppointmentDate] = useState();
  
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
//   let userId = User?.data?.user?._id || User?.user?._id;
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

  const myItemString = localStorage.getItem('user');
    const user = JSON.parse(myItemString);
    const district = user?.data.districtId;
    const userId = user?.data._id;
    const data = {
      districtId:district,
      userId:userId,
      appointmentDate
    }

  // console.log(checked);
  const cancelAppointment = (e) => {
    e.preventDefault();
    console.log(data)
    }
    


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Create Users" pageTitle="Setting" />
     
          {/* end of container */}

        
            <form onSubmit={cancelAppointment}>
            
              
              
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
                      <label className="form-label">
                        Cancel Date<span className="text-danger">*</span>
                      </label>
                      <input type="date" id="cancel" className="form-control" 
                      value={appointmentDate} 
                      onChange={(e) => setAppointmentDate(e.target.value)} />
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="mt-4  w-100">
                      <button
                        type="submit"
                        className="btn  btn-primary"
                        
                        aria-label="Check">CANCEL APPOINTMENT</button>
                    </div>
                  </Col>
                </Row>
      
            
            </form>
        
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CancelAppointment;
const SpinnerBorder = () => {
  return <Spinner className="my-2 text-center" />;
};
