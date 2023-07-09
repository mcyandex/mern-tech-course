import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(
    private mailerService: MailerService
  ) { }
  async sendLoginInfoMail(id:string, password:string, email:string): Promise<boolean> {
    const subject = "Login credentials for MuMerch"
    const url = `http://localhost:3000/auth/login`
    await this.mailerService.sendMail({
      to: email,
      subject: subject,
      html: 
      `<h3>Welcome to MuMerch, a sister concern of MuShophia</h3>
      <p><b>Your login info:</b></p>
      <hr>
      <table>
        <tr>
          <th align="left">ID:</th>
          <td>${id}</td>
        </tr>
        <tr>
          <th align="left">Password:</th>
          <td>${password}</td>
        </tr>
      </table>
      <p>To login, <a href=${url}>Click here</a></p>`
    })
    return true
  }

}