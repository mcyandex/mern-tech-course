import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { TokenEntity } from "src/models/token/token.entity";

@Injectable()
export class AuthService {
  constructor(
    private mailerService: MailerService
  ) { }

  async sendLoginInfoMail(id: string, password: string, email: string): Promise<boolean> {
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

  async sendForgetPasswordMail(data: TokenEntity): Promise<boolean> {
    const subject = "Password recovery code for MuMerch"
    const url = `http://localhost:3000/auth/checkforgetpasswordcode/${data.login.id}`
    await this.mailerService.sendMail({
      to: data.login.email,
      subject: subject,
      html:
        `<h4>MuMerch system received a request to recover password associated with email: ${data.login.email}.</h4>
        <p>Use this code to recover your password:</p>
        <hr>
        <h2>${data.token}</h2>
        <p>To update password, <b><a href=${url}>Click here</a></b></p>
        <p>This code will expire in <b style="color:red;">10 minutes</b>.</p>
        <br>
        <p>If you didnot request for password recovery, you can safely ignore this email.</p>`
    })
    return true
  }
}