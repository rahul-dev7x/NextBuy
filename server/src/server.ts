import express, { Response, response } from 'express';
import dotenv from 'dotenv';
import cors from "cors"
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import dbConnection from './database/dbConnection';
import userRouter from "./routes/user.route"

dotenv.config();
const app=express();

const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors({origin:process.env.FRONTEND_URL,credentials:true}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet({crossOriginResourcePolicy:false}));

app.get("/",(_,res:Response)=>{
res.json(`Server is running on Port:${process.env.PORT}`)
})
app.use("/api/user",userRouter)



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  dbConnection();
});