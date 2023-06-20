require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const app = express();
require("./db/conn");
const authRoutes = require("./routes/authRouter");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const employRoutes = require("./routes/employRouter");
const groupRoutes = require("./routes/groupRouter");
const messageRoutes = require("./routes/messageRouter");
const port = process.env.PORT || 5000;

// app.get("/",(req,res)=>{
//     res.status(201).json("server created")
// });

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(authRoutes);
app.use(employRoutes);
app.use(groupRoutes);
app.use(messageRoutes);

app.listen(port, () => {
  console.log(`server start at port no : ${port}`);
});
