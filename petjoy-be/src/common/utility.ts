import { AppActionResultDto } from "./dto/app-action-result.dto";
import nodemailer from "nodemailer";

export const buildError = (message: string): AppActionResultDto => {
  return {
    data: null,
    message: [message],
    isSuccess: false,
  };
};
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail", // Use your email service
      auth: {
        user: "thinguyenne001@gmail.com", // Your email
        pass: "thinguyenne001@123", // Your email password
      },
    });
  }

  async sendPasswordNotification(email: string, name: string) {
    const mailOptions = {
      from: "thinguyenne001@gmail.com",
      to: email,
      subject: "Password Notification",
      text: `Hello ${name},\n\nYour account has been created successfully. Your default password is: google123@\n\nPlease change your password after logging in.\n\nBest regards,\nYour Company`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
}
