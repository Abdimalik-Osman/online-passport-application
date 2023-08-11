import React, { useContext, useEffect, useMemo, useState } from "react";


import moment from "moment";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Label,
  Row,
} from "reactstrap";

import DataTable from "react-data-table-component";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { LoginContex } from "../../context/loginContext/LoginContext";
const ApplicantList = () => {
  const [modal_list, setmodal_list] = useState(false);
  const [status, setStatus] = useState("");
  const [info, setInfo] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState("");
  const [cardPackage, setCardPackage] = useState("");
  const [customer, setCustomer] = useState();
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [openDate, setOpenDate] = useState("");
  const [closeDate, setCloseDate] = useState("");
  const [usingDays, setUsingDays] = useState("");
  const [amount, setAmount] = useState(8);
  const [Discription, setdescription] = useState("");
  const { openCardRegister } = useContext(LoginContex);
  const [type, setTyp] = useState("text");
  const [customerInfo, setCustomerInfo] = useState();
  const [customerId, setCustomerId] = useState();
  const [Custom, setCustom] = useState("text");
  const [channelId, setChanell] = useState();
  const [cycle, setCycle] = useState("");
  const [numberOfDays, setNumberOfDays] = useState();
  const [numberOfMonths, setNumberOfMonths] = useState();
  const [billAmount, setBillAmount] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [helper, setHelper] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [modal_delete, setmodal_delete] = useState(false);
  const [supervisorInfo, setSupervisorInfo] = useState(""); 

  document.title = "Ticket Supervisor Report";

  const {
    fetchOpenCards,
    OpenCards,
    getCustomerCardList,
    cardList,
    channelPackage,
    fetchChanelPackages,
    closeOpenCard,
    getSupervisors,
    supervisors,
    fetchEmployees,
    FetchSummaryCloseReport,
    summaryCloseReport,
    fetchCustomers,
    customers,fetchTicketSupervisorReport,ticketSupervisorReport
  } = useContext(LoginContex);

  useEffect(() => {
    // FetchAllOpenCardsReport();
    // FetchSummaryCableReport();
    fetchCustomers();
    fetchEmployees();
    getSupervisors();
    FetchSummaryCloseReport();
  }, []);

  console.log(customers);

  console.log(openDate);
  console.log(start);
  console.log(end);
  console.log(OpenCards);
  const handleValidDate = (date) => {
    const date1 = moment(new Date(date)).format("DD MMM Y");
    return date1;
  };
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = ticketSupervisorReport.filter(
    (item) =>
      item.customers[0]?.customerName &&
      item.customers[0]?.customerName?.toLowerCase().includes(filterText.toLowerCase()) && item.customers[0]?.customerPhone ||
      item.customers[0]?.customerPhone?.toString().toLowerCase().includes(filterText.toLowerCase()) 
  );
  console.log(filteredItems);
  console.log(ticketSupervisorReport);
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

  document.title = "Ticket ";

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
  const showToastMessage = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const handlerSubmitOpen = (e) => {
    console.log(e);
    e.preventDefault();
    if (
      !customerInfo?.cardNumber ||
      !customerInfo?.receiverType ||
      !customerInfo?.value ||
      !customerInfo?.value ||
      !channelId ||
      !cycle ||
      !openDate ||
      !billAmount
    ) {
      showToastMessage("please provide required values");
      return;
    }
    console.log(numberOfMonths);
    console.log(closeDate);
    console.log();
    console.log("first");
    const data = {
      cardNumber: customerInfo?.cardNumber,
      receivertype: customerInfo?.receiverType,
      customerId: customerInfo?.value,
      noOfMonthDay: cycle == "month" ? numberOfMonths : numberOfDays,
      endDate:
        cycle === "month"
          ? addMonths(Number(numberOfMonths), dateee)
          : addDays(Number(numberOfDays)),
      startDate: openDate,

      openDate: openDate,
      billingCycle: cycle,
      billAmount: billAmount,
      channelPackageId: channelId,
    };
    e.target.reset();
    openCardRegister(data);
    setmodal_list(false);
    console.log(data);

    // showToastMessage("succefully opened card");
  };

  const editPop = (data) => {
    console.log(data);
    setmodal_list(true);
    setCardNumber(data.cardNumber);
    setBillingCycle(data.billingCycle);
    setCardType(data.receiverType);
    setOpenDate(data.open_date);
    // setCloseDate(data.closeDate);
    setCustomer(data.customerId.customerName);
    setCardPackage(data.channel_package);
  };

  const setbilling = (e) => {
    setBillingCycle(e);

    console.log(e);
    let type = e;

    if (type === "Custom") {
      // document.getElementById("customfield").style.display = "block";
      // document.getElementById("billamount").setAttribute("md={4}");
    } else {
      // document.getElementById("customfield").style.display = "none";
      // document.getElementById("billamount").setAttribute("md={8}");
    }
  };

  let neeew = "11-11-2022";
  if (billingCycle === "monthly") {
    console.log(openDate);
    const test = moment(openDate).utc().format("MM/DD/YYYY");
    console.log(test);
    neeew = new Date(test);
    neeew.setDate(neeew.getDate() + 30);

    console.log(neeew);
  }

  const customizeDate = (month = 0, dayy = 0) => {
    console.log(month);
    const test = moment(openDate).utc().format("MM/DD/YYYY");
    const yep = new Date(test);
    const day = yep.getDate() + 1 + Number(dayy);
    const moonth = `${yep.setMonth(yep.getMonth() + Number(month))}`;
    const year = yep.getFullYear();

    console.log(day, moonth, year);

    const foor = day + "-" + moonth + "-" + year;
    const f = moment(foor).format("D/MM/YYYY");

    setCloseDate(f);
    // console.log(yep.getMonth());
  };

  console.log(openDate);

  function dateWithMonthsDelay(months) {
    console.log(months);
    const date = new Date(openDate);
    date.setMonth(date.getMonth() + months);
    // setCloseDate(date);

    return date;
  }

  const filterThroughDate = () => {
    setHelper(true);
    const startt = moment(start).format("YYYY-MM-DD");
    const enddd = moment(end).format("YYYY-MM-DD");
    fetchTicketSupervisorReport(startt, enddd, supervisorInfo?.value);
  };

  const clearFilter = () => {
    setHelper(false);
    setStart("")
    setEnd("")
    supervisorInfo("")
  };
  console.log(closeDate);

  // console.log();
  // console.log(neeew);
  console.log("type is" + typeof neeew);

  const chan = () => {
    setTyp("date");
  };

  console.log(customer);


  const supervisorsArr = [];

  for (let i = 0; i < supervisors.length; i++) {
    // console.log(supervisors[i]._id);

    var dropdownList = {
      value: supervisors[i]._id,
      label: ` ${supervisors[i].empName} -- ${supervisors[i].mobile}`,
      empname: ` ${supervisors[i].empName}`,
      phoneNumber: ` ${supervisors[i].mobile}`,
    };

    supervisorsArr.push(dropdownList);
  }

  // const sortCard = [];
  // for (let i = 0; i < OpenCards?.length; i++) {
  //   console.log(OpenCards[i]?._id);
  //   let openDate = OpenCards[i].openDate.split("T");
  //   const formattedDate = moment(openDate[0]).format("DD-MM-YYYY");
  //   let endDate = OpenCards[i].endDate.split("T");
  //   const formattedDate2 = moment(endDate[0]).format("DD-MM-YYYY");
  //   let singleArr = [
  //     i + 1,
  //     OpenCards?.[i]?.customerId?.customerName,
  //     OpenCards[i]?.customerId?.customerPhone,
  //     OpenCards[i]?.customerId?.customerAddress,

  //     OpenCards[i]?.cardNumber,
  //     OpenCards[i]?.receivertype,
  //     formattedDate,
  //     formattedDate2,
  //     OpenCards[i]?._id,
  //   ];

  //   sortCard.push(singleArr);
  // }

  // console.log(sortCard);

  const customerCards = [];

  for (let i = 0; i < cardList.length; i++) {
    // console.log(customers[i]._id);

    var dropdownList = {
      value: cardList?.[i]?.dataCustomers?._id,
      cardNumber: cardList?.[i]?.cardNumber,
      receiverType: cardList?.[i]?.datareceivers?.itemType,
      label: cardList?.[i]?.dataCustomers?.customerName,
    };

    customerCards.push(dropdownList);
  }

  console.log(cardList);

  function addMonths(numOfMonths, date = new Date()) {
    console.log(numOfMonths);
    date.setMonth(date.getMonth() + numOfMonths);
    setCloseDate(date);

    return date;
  }

  function addDays(days) {
    var result = new Date(openDate);
    result.setDate(result.getDate() + days);
    setCloseDate(result);
    return result;
  }

  // console.log(closeDate);
  console.log(closeDate);
  // 👇️ Add 2 months to current Date
  // const result = addMonths(2);

  // 👇️ Add months to another date
  const dateee = new Date(openDate);
  const someFn = (row) => {
    console.log(row);
    setmodal_delete(true);
    const selectedRow = {
      name: row.customerName,
      address: row.customerAddress,
      cardNumber: row.cardNumber,
      receiverType: row.receiverType,
      _id: row._id,
      openDate: row.openDate,
      closeDate: row.endDate,
    };
    setInfo(selectedRow);
  };

  console.log(info);
  const closeCard = () => {
    const data = {
      id: info._id,
      description: status,
    };
    console.log(data);
    closeOpenCard(data);
    setStatus("");
    setmodal_delete(false);
  };
   const CvsData = [];
  for (let i = 0; i < filteredItems?.length; i++) {
    console.log(filteredItems[i]._id);

    if(filteredItems[i]?.customers?.[0]?.customerName){
      var dropdownList = {
        Customer: filteredItems[i]?.customers?.[0]?.customerName,
        customerPhone: ` ${filteredItems[i]?.customers?.[0]?.customerPhone}`,
        Address: ` ${filteredItems[i]?.customers?.[0]?.customerAddress}`,
        Employee: ` ${filteredItems[i]?.employees?.[0]?.empName}`,
        EmployeePhone: ` ${filteredItems[i]?.employees?.[0]?.mobile}`,
        Username: ` ${filteredItems[i]?.users_info?.[0]?.username}`,
        Date: ` ${moment(filteredItems[i]?.createdAt).utc().format("DD-MM-YYYY")}`,
        Status: ` ${filteredItems[i]?.customers?.[0]?.isStatus ? "Pending" : "Approved"}`,
  
      };
    }
   

    CvsData.push(dropdownList);
  }
console.log(CvsData)
console.log(ticketSupervisorReport)

  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(CvsData?.[0] || []);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv === null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }
  //   const districtArr = [];

  //   for (let i = 0; i < districts.length; i++) {
  //     // console.log(items[i]._id);

  //     var dropdownList = {
  //       value: districts[i]._id,
  //       label: districts[i].districtName,
  //     };

  //     districtArr.push(dropdownList);
  //   }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Ticket Supervisor Report" pageTitle="Report" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-3">
                    <Col className="col-sm-auto">
                      <div>
                        <ToastContainer />
                        <div className="">
                          <h4 className="card-title mb-0">Ticket Supervisor Report</h4>
                          {/* <Button>Go Back</Button> */}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>

                <CardBody>
                  <div id="Purchasestable">
                    <Row className="mb-5">
                    <Col md={2}>
                    <div className="mb-3">
                              <label className="form-label">Supervisor</label>
                              <Select
                                // className="bg-white"
                                options={supervisorsArr}
                                onChange={(choice) =>
                                  // getCustPhone(e.target.value, e.target)
                                  setSupervisorInfo(choice)
                                }
                                value={supervisorInfo}
                                required
                                theme={(theme) => ({
                                  ...theme,
                                  borderRadius: 0,
                                  colors: {
                                    ...theme.colors,
                                  },
                                })}
                              />
                            </div>
                      </Col>
                      <Col md={2}>
                        <div>
                          <Label htmlFor="PurchasesDate" className="form-label">
                            Start Date
                          </Label>
                          <Flatpickr
                            className="form-control"
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
                      <Col md={2}>
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
                      </Col>
                      
                      <Col md={2}>
                        <div className="form-label">
                          <Button
                            color="success"
                            className=" add-btn mt-4"
                            onClick={filterThroughDate}
                            type="button"
                            //  id="create-btn"
                          >
                            <i className="  ri-file-list-line align-bottom me-1 "></i>{" "}
                            Filter By Date{" "}
                          </Button>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-label">
                          <Button
                            color="success"
                            className=" add-btn mt-4"
                            onClick={clearFilter}
                            type="button"
                            //  id="create-btn"
                          >
                            <i className="  ri-file-list-line align-bottom me-1 "></i>{" "}
                            Clear filter{" "}
                          </Button>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-label">
                          <Button
                            color="success"
                            className=" add-btn mt-4"
                            onClick={()=>{
                              downloadCSV(CvsData)
                            }}
                            type="button"
                            //  id="create-btn"
                          > 
                            <i className="fa fa-print mx-2" aria-hidden="true"> </i>  
                            Download Excel
                          </Button>
                        </div>
                      </Col>
                    </Row>

                    {/* <TableContainer
                      columns={columns}
                      data={summaryCloseReport}
                      isGlobalFilter={true}
                      isAddUserList={false}
                      customPageSize={10}
                      className="custom-header-css"
                      // handleCustomerClick={handleCustomerClicks}
                      // isCustomerFilter={true}
                    /> */}
                    <DataTable

                        columns={columns}
                        data={filteredItems}
                        pagination
                        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                        subHeader
                        subHeaderComponent={subHeaderComponentMemo}
                        // selectableRows
                        persistTableHead
                        // progressPending={true}
                      // sortFunction={customSort}
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

      {/* Remove Modal */}
    </React.Fragment>
  );
};

export default ApplicantList;
