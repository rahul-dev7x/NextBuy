import express, { Response, response } from 'express';
import dotenv from 'dotenv';
import cors from "cors"
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';


dotenv.config();
const app=express();

const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors({credentials:true,origin:process.env.FRONTEND_URL}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet({crossOriginResourcePolicy:false}));

app.get("/",(_,res:Response)=>{
res.json(`Server is running on Port:${process.env.PORT}`)
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});