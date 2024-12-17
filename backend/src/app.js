import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());


//routes imports
import userRouter from "./routers/user.routes.js";
import uploadJobRouter from "./routers/uploadJob.routes.js";
import { getAllJobs } from "./controllers/getAllJobs.controller.js";
import { ApiError } from "./utils/ApiError.js";

// routes declaration
app.use("/api/users",userRouter);
app.use("/api/jobs",uploadJobRouter);
app.get("/api/jobs",getAllJobs);


export {app};
