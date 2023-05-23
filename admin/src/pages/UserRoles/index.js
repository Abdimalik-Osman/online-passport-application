import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Collapse,
  Container,
  Input,
  Label,
  Row,
  Table,
} from "reactstrap";

// import BreadCrumb from '../../../Components/Common/BreadCrumb';
import SimpleBar from "simplebar-react";
import { Link } from "react-router-dom";
import List from "list.js";
import classnames from "classnames";
import Select from "react-select";

import BreadCrumb from "../../Components/Common/BreadCrumb";
// import { LoginContex } from "../../context/loginContext/LoginContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Grid } from "gridjs-react";
import moment from "moment";

const UserRole = () => {
  //LOCAL states
//   const {
//     inventoryReport,
//     inventoryReports,
//     purchReport,
//     purchaseReport,
//     salesReport,
//     getsalesReport,
//     menus,
//     getEmployee,
//     getAllUsers,
//     allUsers,
//     fetchMenus,
//     giveRoles,
//     fetchSingleUserMenus,
//     singleUserMenu,
//     reset_menus,
//   } = useContext(LoginContex);
  const ref = useRef(null);
  const [userinfo, setUserInfo] = useState({
    languages: [],
  });
  const [employeeId, setEmployeeId] = useState("");
  const [checked, setChecked] = useState([]);
  const [tes, settes] = useState([]);
  const [counter, setCounter] = useState(0);
  const [tesla, setthe] = useState();
  const [lastFiltered, setLastFiltered] = useState();
//   const [testState, setTestState] = useState(singleUserMenu);
  const [gees, setGees] = useState();
//   const incomingRoles =
//     singleUserMenu?.[0]?.subItems?.filter((user) => user.status == true) || [];

// //   console.log(incomingRoles);
// //   useEffect(() => {
// //     setTestState(singleUserMenu);
// //     inventoryReport();
// //     purchaseReport();
// //     getAllUsers();
// //     getsalesReport();
// //     fetchMenus();

// //     fetchSingleUserMenus(employeeId?.value);
// //     console.log("calling the state");
// //     setTestState(singleUserMenu);
// //   }, [employeeId?.value]);

// //   // Add/Remove checked item from list
// //   console.log(employeeId?.value);

// //   console.log(checked);


// //   console.log(userinfo);

// //   console.log(testState);
//   let meenus = [];
//   for (let i = 0; i < singleUserMenu?.length; i++) {
//     console.log(singleUserMenu[i]._id);

//     singleUserMenu[i].subItems.forEach((el) => {
//       let singleArr = {
//         submenuId: el.submenuId,
//         submenuName: el.id,
//         mainMenuName: el.mainMenuName,
//         mainMenuId: el.mainMenuId,
//         status: el.status,
//         label: el.label,
//         id: el.id,
//         link: el.link,
//         parentId: el.parentId,
//         sqn: el.sqn,
//       };
//       meenus.push(singleArr);

//       // console.log(singleArr);
//     });
//   }
//   console.log(meenus);
//   ////

//   let temenu = [];
//   for (let i = 0; i < singleUserMenu?.length; i++) {
//     console.log(singleUserMenu[i]._id);

//     singleUserMenu[i].subItems.forEach((el) => {
//       console.log(el);
//       if (el.status == true) {
//         let singleArr = {
//           submenuId: el.submenuId,
//           submenuName: el.id,
//           mainMenuName: el.mainMenuName,
//           mainMenuId: el.mainMenuId,
//           status: el.status,
//           label: el.label,
//           id: el.id,
//           link: el.link,
//           parentId: el.parentId,
//           sqn: el.sqn,
//         };
//         temenu.push(singleArr);
//       }
//     });
//   }


//   console.log(temenu);

//   console.log(singleUserMenu);

//   console.log(incomingRoles);

//   document.title = "Report Center";

//   const [col1, setcol1] = useState(true);

//   const t_col1 = () => {
//     setcol1(!col1);
//   };

//   const Users = [];
// console.log(allUsers)
//   for (let i = 0; i < allUsers.length; i++) {
//     // console.log(setEmployeeId[i]._id);
//     if(allUsers[i]?.isAdmin == false){
//       var dropdownList = {
//         value: allUsers[i]?._id,
//         label: ` ${allUsers[i]?.username}`,
//       };
//       Users.push(dropdownList);
  
//     }
   
//   }

//   /// this is special code bro  //

//   console.log(Users);
//   const main = menus?.subItems;
//   console.log(main);

//   const o = [{ _id: "akram", status: true }];

//   console.log(meenus);
//   console.log(checked);
//   //// the special code ends here //
//   let tem = [];

//   checked?.map((el) => {
//     console.log(el);
//     tem.push(el);
//   });

//   console.log(checked);
//   const p = meenus.filter((val) => checked.includes(val));
//   const the_menus = [...checked, ...meenus];
//   // console.log(tem);
//   console.log(the_menus);

//   let listOfTags = [
//       { id: 1, label: "Hello", color: "red", sorting: 0 },
//       { id: 2, label: "World", color: "green", sorting: 1 },
//       { id: 3, label: "Hello", color: "blue", sorting: 4 },
//       { id: 4, label: "Sunshine", color: "yellow", sorting: 5 },
//       { id: 5, label: "Hello", color: "red", sorting: 6 },
//     ],
//     keys = ["submenuId"],
//     filtered = the_menus.filter(
//       (
//         (s) => (o) =>
//           ((k) => !s.has(k) && s.add(k))(keys.map((k) => o[k]).join("|"))
//       )(new Set())
//     );
//   const showToastMessage = (message) => {
//     toast.error(message, {
//       position: toast.POSITION.TOP_RIGHT,
//     });
//   };

//   const submitForm = (e) => {
//     e.preventDefault();
//     const data = {
//       userId: employeeId?.value,
//       submenu: filtered,
//     };

//     if (!employeeId?.value) {
//       showToastMessage("Please provide user");
//       return;
//     }

//     giveRoles(data);
//     console.log(data);
//     e.target.reset();
//     setEmployeeId("");
//     reset_menus();
//   };
//   const handleCheck = (event) => {
//     console.log("current:--filtered--", filtered);
//     let newMenu = {
//       submenuId: event.target.value,
//       mainMenuId: event.target.getAttribute("idd"),
//       mainMenuName: event.target.getAttribute("mainMenuName"),
//       submenuName: event.target.getAttribute("subMenuName"),
//       label: event.target.getAttribute("labell"),
//       link: event.target.getAttribute("link"),
//       parentId: event.target.getAttribute("parentId"),
//       id: event.target.getAttribute("ids"),
//       status: true,
//       sqn: Number(event.target.getAttribute("sqn")),
//     };
//     var CurrentSubMenu = filtered.filter(
//       (m) => m.submenuId == event.target.getAttribute("submenuId")
//     );

//     console.log(CurrentSubMenu);
//     console.log((CurrentSubMenu[0] = { ...newMenu }));
//     if (!CurrentSubMenu[0]) CurrentSubMenu[0] = { ...newMenu };

//     console.log("majir", CurrentSubMenu[0]);
//     CurrentSubMenu[0].status = event.target.checked;

//     console.log("Updated:---CurrentSubMenu-", CurrentSubMenu);
//     let newTemenu = [
//       ...filtered.filter(
//         (m) => m.submenuId != event.target.getAttribute("submenuId")
//       ),
//     ];

//     let updateTemenu = [...newTemenu];
//     updateTemenu.push(...CurrentSubMenu);

//     //  setChecked(updateTemenu);
//     console.log("Updated:----", updateTemenu);
//     filtered = [...updateTemenu];
//     console.log("Updated:--filtered--", filtered);
//     console.log("Updated:--temenu--", temenu);
//   };

//   console.log(filtered)
  // const handleCheck = (event) => {
  //   console.log(event.target.value);
  //   setthe(event.target.value);
  //   console.log(event.target.checked);
  //   console.log(event.target.getAttribute("idd"));
  //   console.log(singleUserMenu);

  //   var updatedList = [...checked, ...temenu];
  //   console.log(updatedList);

  //   ////////////
  //   var arr = [];
  //   for (let i = 0; i < singleUserMenu?.length; i++) {
  //     console.log(singleUserMenu[i].title);
  //     arr.push(singleUserMenu[i].title);

  //     let r = singleUserMenu[i].subItems.filter(
  //       (t) => t.submenuId == event.target.value && { ...t, status: "muscab" }
  //     );
  //     arr.push(r);
  //   }

  //   console.log(arr);
  //   // setTestState(genuis);
  //   /////////////////
  //   console.log(event.target.checked);
  //   if (event.target.checked) {
  //     let inputs = document.getElementById("activetableCheck01");
  //     // inputs.checked = !checked;
  //     console.log(inputs);
  //     updatedList = [
  //       ...checked,
  //       ...temenu,
  //       {
  //         submenuId: event.target.value,
  //         mainMenuId: event.target.getAttribute("idd"),
  //         mainMenuName: event.target.getAttribute("mainMenuName"),
  //         submenuName: event.target.getAttribute("subMenuName"),
  //         label: event.target.getAttribute("labell"),
  //         link: event.target.getAttribute("link"),
  //         parentId: event.target.getAttribute("parentId"),
  //         id: event.target.getAttribute("ids"),
  //         status: true,
  //         sqn: Number(event.target.getAttribute("sqn")),
  //       },
  //     ];
  //   } else {
  //     console.log(event.target.value);
  //     console.log(checked);
  //     // updatedList.splice(checked.indexOf(event.target.value), 1);
  //     // changeDesc(event.target.value);
  //     changeDesc(event.target.value);

  //     updatedList = checked.filter(
  //       (chec) => chec.submenuId != event.target.value
  //     );
  //   }
  //   setChecked(updatedList);

  //   // settes(test);
  // };

  // let list = {};
  // function removeDupIds(array) {
  //   let id;
  //   for (var i = 0; i < array.length; i++) {
  //     id = array[i].submenuId;
  //     if (id in list) {
  //       // found a dup id, remove it
  //       console.log(id);
  //       console.log(list);
  //       array.splice(i, 1);
  //       // correct for loop index so it will process the item
  //       // that just moved down in place of the one we just removed
  //       --i;
  //     } else {
  //       // add the id to our map
  //       list = {
  //         status: "true",
  //         name: "test",
  //       };
  //     }
  //   }
  // }
  // removeDupIds(the_menus);

  // console.log(temp_array);
//   console.log(incomingRoles);
//   console.log(checked);
//   console.log(filtered);
//   console.log(singleUserMenu);
  // console.log(menus);
  const da = [
    { mainMenuId: "sa45666225g8", menuId: "g2336d87e9", status: true },
    { mainMenuId: "sa45666225g8", menuId: "g2336d87e9", status: false },
    { mainMenuId: "sa45666225g8", menuId: "g2336d87e9", status: true },
    { mainMenuId: "sa45666225g8", menuId: "g2336d87e9", status: "true" },
  ];

  // function changeDesc(value) {
  //   console.log(value);
  //   console.log(`Calling the function`);
  //   for (var i in filtered) {
  //     if (filtered[i].submenuId == value) {
  //       console.log("THEY ARE EQUALS");
  //       filtered[i].status = false;
  //       break; //Stop this loop, we found it!
  //     } else {
  //       filtered[i].status = filtered[i].status;
  //     }
  //   }
  //   setLastFiltered(filtered);
  //   console.log(filtered);
  // }
  // // changeDesc("6385812cd088ab91a752eed9");

  // console.log(lastFiltered);

//   console.log(filtered);

  const array = [
    { id: 1, name: "mascuud" },
    { id: 2, name: "muscab" },
    { id: 3, name: "usama" },
    { id: 4, name: "suheyb" },
    { id: 5, name: "salmaan" },
    { id: 1, name: "mascuud" },
    { id: 2, name: "muscab" },
    { id: 3, name: "usama" },
    { id: 3, name: "usama" },
    { id: 4, name: "suheyb" },
    { id: 5, name: "salmaan" },
  ];

//   const result = the_menus.reduce((finalArr, current) => {
//     let obj = finalArr?.find((item) => item.submenuId == current.submenuId);
//     console.log(obj);
//     if (obj) return finalArr;
//     return finalArr.concat([current]);
//   }, []);

//   console.log(result);
//   console.log(the_menus);
//   console.log(checked);

//   function change_status(_data, _old, _new, id) {
//     console.log(id);
//     const index = _data.findIndex((object) => {
//       return object.id === id;
//     });
//     for (var key in _data) {
//       console.log(_data[key]);
//       if (_data[key].submenuId == id) {
//         console.log("trueeeeeeeeeeeeeee");

//         _data[key].status = false;
//         setGees((previos) => {
//           return {
//             ...previos,
//             status: false,
//           };
//         });
//       }
//     }
//     const y = _data;
//     console.log(gees);

//     return _data;
//   }

//   console.log(filtered);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="User Role" pageTitle="Settings" />
          <Accordion className="border card-border-info">
            <AccordionItem>
              <h1 className="accordion-header" id="headingOne">
                <button
                //   className={classnames("accordion-button", {
                //     collapsed: !col1,
                //   })}
                  type="button"
                //   onClick={t_col1}
                  style={{ cursor: "pointer" }}
                >
                  User Main Role
                </button>
              </h1>
              <Collapse
                isOpen={false}
                className="accordion-collapse"
                id="collapseOne"
              >
                <div className="accordion-body">
                  <form>
                    <Row>
                      <Col md={4}>
                        <div className="mb-3">
                          <label className="form-label">Users </label>
                          <ToastContainer />
                          <div>
                            <Select
                              // className="bg-white"
                            //   options={Users}
                            //   onChange={(choice) => {
                            //     reset_menus();
                            //     setEmployeeId(choice);
                            //     // setChecked(temenu);
                            //   }}
                            //   value={Users.filter(function (option) {
                            //     return option.value === employeeId?.value;
                            //   })}
                            //   theme={(theme) => ({
                            //     ...theme,
                            //     borderRadius: 0,
                            //     colors: {
                            //       ...theme.colors,
                            //     },
                            //   })}
                            />
                          </div>
                        </div>
                      </Col>
                     

                      <div className="hstack gap-2 justify-content-end">
                        <button
                          type="submit"
                          className="btn btn-success"
                          id="add-btn"
                          // onClick={}
                        >
                          Grant/Revoke Role
                        </button>
                      </div>
                    </Row>
                  </form>
                </div>
              </Collapse>
            </AccordionItem>
          </Accordion>
          <Row></Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UserRole;
