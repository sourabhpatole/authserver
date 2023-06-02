require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const app = express();
require("./db/conn");
const router = require("./routes/router");
const cors = require("cors");
const cookiParser = require("cookie-parser");
const userRoutes = require("./routes/userRouter");
const groupRoutes = require("./routes/groupRouter");
const port = process.env.PORT || 8009;

// app.get("/",(req,res)=>{
//     res.status(201).json("server created")
// });

app.use(express.json());
app.use(cookiParser());
app.use(helmet());
app.use(cors());
app.use(router);
app.use(userRoutes);
app.use(groupRoutes);

app.listen(port, () => {
  console.log(`server start at port no : ${port}`);
});
