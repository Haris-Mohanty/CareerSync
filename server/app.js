import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import colors from "colors";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";

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

//********* Port and Listen ******/
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(
    `Node server running in ${process.env.DEV_MODE} mode on Port ${port}.`
      .bgBrightBlue.white
  );
});
