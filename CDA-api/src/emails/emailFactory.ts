"use strict";
const nodemailer = require("nodemailer");

export default async function sendMail(args: { to: string, subject: string, text: string, html?: string }) {
    let testAccount = {user: 'simpleplan.wcs.help@gmail.com', password: "jxjaffeqlsooxrfw"};

    if(!args.html) args.html='';
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: testAccount.user,
            pass: testAccount.password
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: args?.to, // sender address
        to: args?.to, // list of receivers
        subject: args?.subject, // Subject line
        text: args?.text, // plain text body
        html: args?.html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
