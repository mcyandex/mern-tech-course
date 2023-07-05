import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(
    private mailerService: MailerService
  ) { }
  async sendMail(text: string, subject:string, email: string): Promise<boolean> {
    await this.mailerService.sendMail({
      to: email,
      subject: subject,
      text: text,
    })
    return true
  }

}