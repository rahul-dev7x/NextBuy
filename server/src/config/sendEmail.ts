import { Resend } from 'resend';
import dotenv from "dotenv"
import UserModel from '../models/user.model';
dotenv.config({})

const resend = new Resend(process.env.RESEND_API_KEY);
if(!process.env.RESEND_API_KEY)
{
    throw new Error("Resend api key is not available")
}

interface EmailParams {
    sendTo: string;
    subject: string;
    html: any;
}

const sendEmail = async({sendTo, subject, html}: EmailParams) => {
    try{
        const { data, error } = await resend.emails.send({
            from: "Next Buy<onboarding@resend.dev>",
            to: sendTo,
            subject: subject,
            html: html,
          });
        
          if (error) {
            return console.error({ error });
          }
          return data;
    }
    catch(err)
    {
        console.log(err)
    }
}





export default sendEmail;