import nodemailer from "nodemailer";
import { EnvConfiguration } from "../config/env.config";
// import tokenService from "../services/token/token.service";

export enum MailType {
  RESET_PASSWORD = "RESET_PASSWORD",
  LOGIN_OTP = "LOGIN_OTP",
}

class EmailUtil {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: EnvConfiguration.MAIL_HOST,
      auth: {
        user: EnvConfiguration.MAIL_USER,
        pass: EnvConfiguration.MAIL_PASSWORD,
      },
    });
  }

  async sendMail(to: string, mailType: MailType) {
    const { subject, body } = await this.getTemplate(to, mailType);
    await this.transporter.sendMail({
      from: EnvConfiguration.MAIL_USER,
      to,
      subject,
      text: body,
      html: body,
    });
  }

  private async getTemplate(email: string, mailType: MailType) {
    let subject, body;
    switch (mailType) {
      case MailType.RESET_PASSWORD:
        // const token = await tokenService.createResetPasswordToken(email);
        const token = "abc";
        const link = `${EnvConfiguration.FRONTEND_BASE_URL}/reset-password?token=${token}`;

        subject = "Reset password";
        body = `Your Reset Link is <b><a href=${link}>${link}</a></b>`;
        break;
    }
    return { subject, body };
  }
}

export default new EmailUtil();
