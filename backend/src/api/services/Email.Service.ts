import { Resend } from "resend";
import logger from "../../../logger";

const sender = `<${process.env.RESEND_SENDER as string}>`;

const resend = new Resend(process.env.RESEND_API_KEY as string);

export class EmailService {
  async sendVerificationEmail(payload: any): Promise<void> { 
    const { email, otp } = payload;
    console.log("the otp:", otp);
    try {
      // const template = await ejs.renderFile("email_templates/otp.ejs", {
      //   email,
      //   otp,
      // });

      const response = await resend.emails.send({
        from: `Palé ${sender}`,
        to: email,
        subject: " Your Palé User Verification Code",
        html: `Your verification code is: ${otp}`,
      });
      logger.info("User verification email sent");
    } catch (error: any) {
      logger.error(`Verification email error: ${error.message}`);
    }
  }

  async sendPasswordResetOTP(payload: any): Promise<void> {
    const { email, otp } = payload;
    try {
      // const template = await ejs.renderFile("email_templates/otp.ejs", {
      //   email,
      //   otp,
      // });
      const response = await resend.emails.send({
        from: `Palé ${sender}`,
        to: email,
        subject: "Update Your Palé Password",
        html: `Your password update code is: ${otp}`,
      });
      logger.info(`Password update email sent to: ${email}`);
    } catch (error: any) {
      logger.error(`Password update email error: ${error.message}`);
    }
  }

  async sendWelcomeEmail(payload: any): Promise<void> {
    const { email } = payload;
    // console.log(email);
    try {
      // const template = await ejs.renderFile("email_templates/Welcome.ejs", {
      //   email,
      // });
      const response = await resend.emails.send({
        from: `Palé ${sender}`,
        to: email,
        subject: "Welcome to Palé",
        html: `Welcome to Palé`,
      });
      logger.info(`Welcome email sent to: ${email}`);
    } catch (error: any) {
      logger.error(`Welcome email error: ${error.message}`);
    }
  }

  // async sendLoginOTP(payload: any): Promise<void> {
  //   const { email, otp } = payload;
  //   // console.log(email, otp);
  //   try {
  //     // const template = await ejs.renderFile("email_templates/otp.ejs", {
  //     //   email,
  //     //   otp,
  //     // });
  //     const response = await resend.emails.send({
  //       from: `Palé ${sender}`,
  //       to: email,
  //       subject: "Important: Login 2FA",
  //       html: `Your login 2FA code is: ${otp}`,
  //     });
  //     logger.info(`Login OTP email sent to: ${email}`);
  //   } catch (error: any) {
  //     logger.error(`Login OTP email error: ${error.message}`);
  //   }
  // }

  async sendAdminWelcomeEmail(payload: any): Promise<void> {
    const { password, email } = payload;
    try {
      // const template = await ejs.renderFile("email_templates/Welcome.ejs", {
      //   email,
      // });
      const response = await resend.emails.send({
        from: `Palé ${sender}`,
        to: email,
        subject: "Welcome to Palé",
        html: `Welcome to Palé
        Email: ${email}
        Here's your temporary password: ${password}
        `,
      });
      logger.info(`Welcome email sent to: ${email}`);
    } catch (error: any) {
      logger.error(`Welcome email error: ${error.message}`);
    }
  }

  async sendBatchEmail(payload: {
    message: string;
    subject: string;
    recipients: string[];
  }) {
    const { message, subject, recipients } = payload;
    // console.log(message, subject, recipients);
    try {
      const response = await resend.emails.send({
        from: `Palé ${sender}`,
        to: recipients,
        subject: subject,
        html: message,
      });
      logger.info(`Batch Email Successfully Sent`);
    } catch (error: any) {
      logger.error(`Batch Email Failed: ${error.message}`);
    }
  }
}
