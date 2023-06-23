// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// var autoIncrement = require("mongoose-auto-increment");
// var menusSchema = new Schema(
//   {
//     menuId: { type: Number },
//     title: { type: String },
//     url: { type: String },
//     // icon: { type: String },
//     hasParent: { type: Boolean, default: false },
//     parentId: { type: mongoose.Types.ObjectId, ref: "menus", default: null },
//     subItems: [
//         {
        
//             mainMenuId:{ type:mongoose.Types.ObjectId, ref: "menus", default:null },
//             submenuId:{ type:mongoose.Types.ObjectId, ref: "menus", default:null },
//             mainMenuName:{ type:String, default:null },
//             submenuName:{ type:String, default:null },
//             status:{type: Boolean, default:false },
//             id: { type: String, default:null },
//             label: { type: String, default:null },
//             link: { type: String,default:null },
//             parentId: { type: String, default:null },
//           },
//         ],
//         // parentId: { type: Number },
//         visibility: { type: Number, default: 0 },
//         priority: { type: Number,default:1 },
//       },
//       { timestamps: true }
//     );
//     autoIncrement.initialize(mongoose.connection);
//      // This is important. You can remove initialization in different file
//     menusSchema.plugin(autoIncrement.plugin, {
//       model: "menus",
//       field: "menuId",
//       startAt: 1,
//       incrementBy: 1,
//     });
//     module.exports = mongoose.model("menus", menusSchema);