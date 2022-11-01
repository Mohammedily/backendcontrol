const nodemailer = require("nodemailer");

module.exports = async(email, subject, text) => {
  try {
        const transporter =  nodemailer.createTransport({
            host: process.env.HOST || "smtp.gmail.com",
            service: process.env.SERVICE || "gmail",
            port: process.env.PORT || 587,
            secure: process.env.secure || true,
            auth:{
                user: process.env.user || "iyvhdf@gmail.com",
                pass: process.env.PASS || "bsfotelfcoirybno"
            }
        });

    await transporter.sendMail({
            from: process.env.USER || "iyvhdf@gmail.com",
            to: email,
            subject: subject,
            text: text
        })

   console.log("email sent Sucessfully");
    } catch (error) {
        console.log("email not sent!");

      console.log(error);


      return error;
    }
}