import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const REGION = process.env.REGION || 'us-east-1';
const ses = new SESClient({ region: REGION });


export const handler = async ( event: any, context: any ) => {
    console.log(event);
    const emailParams = {
      Destination: {
        ToAddresses: ["test@gmail.com"], 
      },
      Message: {
        Body: {
          Text: {
            Data: "🚨 Daily Reminder: Don’t forget to update your GitHub progress! 💪",
          },
        },
        Subject: {
          Data: "Daily Reminder",
        },
      },
      Source: process.env.EMAIL_SOURCE, 
    };
  
    try {
      await ses.send(new SendEmailCommand(emailParams));
      console.log("Email sent successfully");
    } catch (err) {
      console.error("Error sending email", err);
    }
  };