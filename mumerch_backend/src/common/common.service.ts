import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { html2pdf, base64ToPdf } from "better-html-pdf";
import * as fs from 'fs-extra';
import { OrderService } from "src/models/order/order.service";
import { TokenEntity } from "src/models/token/token.entity";

@Injectable()
export class CommonService {
  constructor(
    private mailerService: MailerService,
    private orderService: OrderService
  ) { }

  async sendMail(data: any): Promise<boolean> {
    await this.mailerService.sendMail({
      to: data.email,
      subject: data.subject,
      html: data.text
    })
    return true
  }

  loginMailStructure(id: string, password: string, email): object {
    const subject = "Login credentials for MuMerch"
    const url = `http://localhost:8000/auth/login`
    const html =
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
    return { email, subject, html }
  }

  forgetPasswordMailStructure(data: TokenEntity): object {
    const email = data.login.email
    const subject = "Password recovery code for MuMerch"
    const url = `http://localhost:8000/auth/checkforgetpasswordcode/${data.login.id}`
    const html =
      `<h4>MuMerch system received a request to recover password associated with email: ${data.login.email}.</h4>
      <p>Use this code to recover your password:</p>
      <hr>
      <h2>${data.token}</h2>
      <p>To update password, <b><a href=${url}>Click here</a></b></p>
      <p>This code will expire in <b style="color:red;">10 minutes</b>.</p>
      <br>
      <p>If you didnot request for password recovery, you can safely ignore this email.</p>`
    return { email, subject, html }
  }

  async generatePdf(html: string, type: string, name: string): Promise<void> {
    const fileContentB64 = await html2pdf(html, {
      avoidTableRowBreak: true,
      repeatTableHeader: false,
      marginLeft: '20px',
      marginTop: '20px',
      marginBottom: '20px',
      marginRight: '20px',
      height: '792px',
      width: '612px'
    });

    const destinationDir = `./uploads/${type}`;
    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir, { recursive: true });
    }
    const fileName = destinationDir + `/${name}.pdf`
    if (typeof fileContentB64 === 'string') {
      await base64ToPdf(fileContentB64, fileName);
    }
  }

  async invoiceStructure(orderId: string): Promise<string> {
    const data = await this.orderService.getOrderById(orderId)
    console.log(data)
    let total: number = 0
    let salesRows = '';

    for (const item of data.orderProducts) {
      let sum:number=0
      const quantity: number = item.orderQuantity
      const price: number = item.orderPrice
      sum += quantity * price
      total+=sum
      console.log(item.orderPrice, total)
      salesRows +=
        ` <tr>
          <td>${item.productDetails.name}</td>
          <td>${quantity}</td>
          <td>${price}</td>
          <td>${sum}</td>
        </tr>
      `
    }
    const html =
      `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Invoice</title>
      <style>
        body {
          font-family: Arial, sans-serif;
        }
        .invoice-header {
          text-align: center;
        }
        .invoice-header h2 {
          margin: 0;
        }
        .invoice-subheader {
          text-align: center;
          margin-bottom: 20px;
        }
        .invoice-subheader p {
          margin: 5px 0;
        }
        .invoice-details {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .customer-details {
          margin-bottom: 20px;
        }
        .table-container {
          width: 100%;
          margin-bottom: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          padding: 8px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        .total-row {
          font-weight: bold;
        }
        .customer-table {
          border-collapse: collapse;
        }
        .customer-table td {
          padding: 5px;
        }
      </style>
    </head>
    <body>
      <div class="invoice-header">
        <h2>MuMerch</h2>
        <div class="invoice-subheader">
          <p>Website: www.example.com</p>
          <p>Contact: +880 1911 *** ***</p>
          <p>Address: Kuril 3/A,Dhaka, Bangladesh</p>
        </div>
      </div>
      <table>
        <tr>
          <td colspan="2">Customer Name:</td>
          <td colspan="2">${data.customer.name}</td>
        </tr>
        <tr>
          <td>Phone:</td>
          <td>${data.customer.phoneNo}</td>
          <td>Email:</td>
          <td>${data.customer.email}</td>
        </tr>
      </table>
      <h4>Order Id: ${orderId}</h4>
      <br>
      <br>
      <div class="table-container">
        <table>
          <caption>Sales details</caption>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Amount</th>
          </tr>
          ${salesRows}
          <tr class="total-row">
          <td colspan="4" style = "text-align: right;" > Total: </td>
            <td> ${total} </td>
          </tr>
        </table>
        </div>
      </body>
    </html> 
    `
    return html
  }
}