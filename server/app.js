import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import colors from "colors";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";

//**** Dotenv config ***/
dotenv.config();

//****** Database config *****/
connectDb();

//******** Rest obj ******/
const app = express();

//******** Middleware ******/
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true, // Enable credentials
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

//********* Middleware Routes ******/
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoutes);

//********* Port and Listen ******/
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(
    `Node server running in ${process.env.DEV_MODE} mode on Port ${port}.`
      .bgBrightBlue.white
  );
});
