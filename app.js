require("dotenv").config();
const expressapp = require("express");
const helmet = require("helmet");
const app = expressapp();
require("./db/conn");
const router = require("./routes/router");
const cors = require("cors");
const cookiParser = require("cookie-parser");
const userRoutes = require("./routes/userRouter");
const groupRoutes = require("./routes/groupRouter");
const port = process.env.PORT || 5000;

// app.get("/",(req,res)=>{
//     res.status(201).json("server created")
// });

app.use(expressapp.json());
app.use(cookiParser());
app.use(helmet());
app.use(cors());
app.use(router);
app.use(userRoutes);
app.use(groupRoutes);

app.listen(port, () => {
  console.log(`server start at port no : ${port}`);
});
