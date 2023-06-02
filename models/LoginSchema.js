const mongoose = require("mongoose");
const loginSchema = new mongoose.Schema(
  {
    userId: { type: "string", required: true },
    name: {
      type: "String",
      required: true,
      trim: true,
    },
    email: {
      type: "String",
      required: true,
    },
  },
  { timestamps: true }
);

// loginSchema.pre.generateUserHistory = async function () {
//   const date = new Date();
//   this.loginTimeHistory = this.loginTimeHistory.concat({
//     lastLog: date,
//   });
//   // console.log(date);
//   await this.save();

//   return this.lastLogins;
// };
// loginSchema.methods.GenHistory = async function () {
//   const date = Date.now();
//   lastLogin.append(date),
//     // console.log(date);
//     await this.save();

//   return this.lastLogins;
// };
const loginHistory = new mongoose.model("LoginHistory", loginSchema);
module.exports = loginHistory;
