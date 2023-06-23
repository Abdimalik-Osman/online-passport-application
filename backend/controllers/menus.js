const menus = require("../models/menus")

const mongoose = require("mongoose");
// const User = require("mongoose").model("users");

// exports.getMenusRole = async (req, res) => {
//   try {
 

//     const systemRolesList = await systemRoles.aggregate([
//       { $unwind: "$submenu" }, 
//       {
//         $match: {
//           // "submenu.status": true,
//           userId: mongoose.Types.ObjectId(req.params.id),
//         },
//       },
//       {
//         $lookup: {
//           localField: "submenu.mainMenuId",
//           foreignField: "_id",
//           as: "menu",
//           from: "menus",
//         },
//       },
//       { $unwind: "$menu" },
//       {
//         $group: {
//           _id: "$menu._id",

//           title: { $last: "$menu.title" },
//           url: { $last: "$menu.url" },
//           icon: { $last: "$menu.icon" },
//           hasParent: { $last: "$menu.hasParent" },
//           parentId: { $last: "$menu.parentId" },

//           subItems: {
//             $push: {
//               sqn: "$submenu.sqn",
//               mainMenuId: "$submenu.mainMenuId",
//               submenuId: "$submenu.submenuId",
//               mainMenuName: "$submenu.mainMenuName",
//               submenuName: "$submenu.submenuName",
//               status: "$submenu.status",
//               id: "$submenu.id",
//               label: "$submenu.label",
//               link: "$submenu.link",
//               parentId: "$submenu.parentId",
//               _id: "$submenu._id",
//             },
//           },
//         },
//       },
//       {
//         $sort: {
//           _id: 1,
//         },
//       },
//     ]);

//     // console.log("Waaa hhhh ", systemRolesList);
//     // check if there's any mistake happens
//     if (!systemRolesList[0]) {
//       console.log("Waa Tijaabo");
//       const menusList = await menus.find({});
//       res.status(200).json(menusList);
//     } else {
//       res.status(200).json(systemRolesList);
//     }
   
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
// };

// exports.get_all_menusRole = async (req, res) => {
//   try {
//     const menusList = await menus.find({});

//     // check if there's any mistake happens
//     if (!menusList) {
//       res.status(500).json({ success: false });
//     } else {
//       res.status(200).json(menusList);
//     }
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
// };

// exports.get_all_menus = async (req, res) => {
//   try {
//     // const menusList = await menus.find({});
//     // console.log("666666666666666666666666666666666=================66666666666");
//     // console.log(mongoose.Types.ObjectId(req.params.id))
//     const userAdmin =await User.findOne({_id:mongoose.Types.ObjectId(req.params.id)})
//     if(userAdmin.isAdmin == true || userAdmin.isAdmin == "true"){
//       const menusList = await menus.find({});

//       // check if there's any mistake happens
//       if (!menusList) {
//         res.status(500).json({ success: false });
//       } else {
//         res.status(200).json(menusList);
//       }
//       return;
//     }
//     const menusList = await systemRoles.aggregate([
//       { $unwind: "$submenu" },
//       {
//         $match: {
//           "submenu.status": true,
//           userId: mongoose.Types.ObjectId(req.params.id),
//         },
//       },
//       {
//         $lookup: {
//           localField: "submenu.mainMenuId",
//           foreignField: "_id",
//           as: "menu",
//           from: "menus",
//         },
//       },
//       { $unwind: "$menu" },
//       {
//         $group: {
//           _id: "$menu._id",

//           title: { $last: "$menu.title" },
//           url: { $last: "$menu.url" },
//           icon: { $last: "$menu.icon" },
//           hasParent: { $last: "$menu.hasParent" },
//           parentId: { $last: "$menu.parentId" },

//           subItems: {
//             $push: {
//               sqn: "$submenu.sqn",
//               mainMenuId: "$submenu.mainMenuId",
//               submenuId: "$submenu.submenuId",
//               mainMenuName: "$submenu.mainMenuName",
//               submenuName: "$submenu.submenuName",
//               status: "$submenu.status",
//               id: "$submenu.id",
//               label: "$submenu.label",
//               link: "$submenu.link",
//               parentId: "$submenu.parentId",
//               _id: "$submenu._id",
//             },
//           },
//         },
//       },
//       {
//         $sort: {
//           _id: 1,
//         },
//       },
//     ]);

//     // menusList = menusList.filter(function (acc) {
//     //   return acc;
//     // });

//     // menusList= menusList
//     // check if there's any mistake happens
//     if (!menusList) {
//       res.status(500).json({ success: false });
//     } else {
//       res.status(200).json(menusList);
//     }
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
// };

// exports.get_all_SubMenus = async (req, res) => {
//   try {
//     const menusList = await menus.find({});
//     // check if there's any mistake happens
//     if (!menusList) {
//       res.status(500).json({ success: false });
//     }
//     res.status(200).json(menusList);
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
// };
// // add menue
exports.add_menus = async (req, res) => {
  try {
    if (
      req.body.title == "0" ||
      req.body.title == "" ||
      req.body.title == null
    ) {
      return res.status(401).json({ message: "Enter title", status: "error" });
    }

    // if (req.body.icon == "0" || req.body.icon == "" || req.body.icon == null) {
    //   return res.status(401).json({ message: "Enter icon", status: "error" });
    // }

    if (req.body.hasParent == true) {
      if (req.body.url == "0" || req.body.url == "" || req.body.url == null) {
        return res.status(401).json({ message: "Enter url", status: "error" });
      }

      if (
        req.body.parentId == "0" ||
        req.body.parentId == "" ||
        req.body.parentId == null
      ) {
        return res
          .status(401)
          .json({ message: "Enter parentId", status: "error" });
      }
    }
    if (req.body.hasParent == false) {
      req.body.parentId = null;
    }



    //--------------------------------------------------- else 
    let newMenus = new menus({
      title: req.body.title,
      url: req.body.url,
      icon: req.body.icon,
      hasParent: req.body.hasParent,
      parentId: req.body.parentId,
      subItems: req.body.subItems,
      // visibility: req.body.visibility,
      
    });
    
      await newMenus.save();
    if (newMenus) {
      await menus.findByIdAndUpdate(
        { _id: newMenus._id },
        { "subItems.mainMenuId": newMenus._id, "subItems.submenuId": newMenus.subItems._id }
      );
    
      let data = await systemRoles.find({ "submenu.mainMenuId": mongoose.Types.ObjectId(newMenus._id)});
      let info = {
        mainMenuId: newMenus._id,
        submenuId: newMenus.subItems._id,
        mainMenuName: newMenus.subItems.mainMenuName,
        submenuName: newMenus.subItems.submenuName,
        status: false,
        id: newMenus.subItems.id,
        label: newMenus.subItems.label,
        link: newMenus.subItems.link,
        parentId: "dashboard",
      };
    
      // Use a for loop instead of forEach() to allow for awaiting inside the loop
      for (let i = 0; i < data.length; i++) {
        let arr = data[i];
        arr.submenu.push(info);
        await arr.save(); // Save the updated document back to the database
      }

     return res.json({
        message: "Record is saved",
        status: "success",
        data: {
          newMenus: newMenus,
        },
      });
    }
    

    else {
      return res
        .status(401)
        .json({ message: "Record can not be saved", status: "error" });
      // return res.status(401).send("Record can not be saved");
    
      // res.send(newadvance);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// add submen 
// exports.add_sub_menu = async(req,res) =>{
//   try {
  
//     const menuData = await menus.findOne({ "subItems.mainMenuId": mongoose.Types.ObjectId(req.body.mainMenuId) });
//     if (menuData) {
//       menuData.subItems.push(req.body);
//       await menuData.save(); // Await the save() method to ensure the document is saved before continuing
    
//       const newSubmenuItem = menuData.subItems[menuData.subItems.length - 1];
//       await menus.findByIdAndUpdate(
//         { _id: req.body.mainMenuId },
//         { "subItems.$[elem].submenuId": newSubmenuItem._id },
//         { arrayFilters: [{ "elem._id": newSubmenuItem._id }] } // Use arrayFilters to target the specific element in the subItems array
//       );
//       // let d = menuData.subItems[menuData.subItems.length -1]
//         // console.log(d)
//       let data = await systemRoles.find({"submenu.mainMenuId": mongoose.Types.ObjectId(req.body.mainMenuId)});
      

//       let info = {
//         sqn:req.body.sqn,
//         mainMenuId: req.body.mainMenuId,
//         submenuId: newSubmenuItem._id,
//         mainMenuName: req.body.mainMenuName,
//         submenuName: req.body.submenuName,
//         status: false,
//         id: req.body.id,
//         label: req.body.label,
//         link: req.body.link,
//         parentId: req.body.parentId,
//       };
    
//       // Use a for loop instead of forEach() to allow for awaiting inside the loop
//       for (let i = 0; i < data.length; i++) {
//         let arr = data[i];
//         arr.submenu.push(info);
//         await arr.save();
//         // console.log(arr) // Save the updated document back to the database
//         // await systemRoles.findByIdAndUpdate(
//         //   { "submenu._id": arr._id },
//         //   {"submenu.submenuId": arr._id }
//         // );
//       }
//       // console.log()
//      return res.json({
//         message: "Record is saved",
//         status: "success",
//         menuData
//       });
//     }else{
//       return res.json({error:"invalid main menu id", status: "error"})
//     }

//   } catch (error) {
//     return res.status(500).json({message:error.message})
//   }
// }
// exports.getAllUserMenus = async (req,res)=>{
//   try{
//     let info = {
//       sqn: 26,
//       mainMenuId: "63858becb30ebbd9f4291216",
//       submenuId: "63858becb30ebbd9f4291219",
//       mainMenuName: "Ticket",
//       submenuName: "delete Tickets",
//       status: false,
//       id: "delete Tickets",
//       label: "delete Tickets",
//       link: "/deleteTicket",
//       parentId: "dashboard",
//     }
//     let all = []
//     let data = await systemRoles.find({"submenu.mainMenuId":"63858becb30ebbd9f4291216"});
    
//    let newData = [];
//    data?.forEach(async(arr) => {
//       await arr.submenu.push(info);
//        newData.push(arr);
//    })

//     return res.status(200).json(data)
      
//   }catch(err){
//     return res.status(500).json({ message: err.message});
//   }
// }