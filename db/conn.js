// const mongoose = require("mongoose");
// const DB =
//   "mongodb+srv://sourabh:950fqmITykAdAOT1@cluster0.wos0aih.mongodb.net/authlogin?retryWrites=true&w=majority";

// mongoose
//   .connect(DB, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   })
//   .then(() => console.log("database connection established"))
//   .catch((err) => console.error(err));

const mongoose = require("mongoose");

const DB =
  "mongodb+srv://sourabh:950fqmITykAdAOT1@cluster0.wos0aih.mongodb.net/authlogin?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DataBase Connected"))
  .catch((errr) => {
    console.log(errr);
  });
