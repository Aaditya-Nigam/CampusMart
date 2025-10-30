const nodemailer=require("nodemailer")

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: `CampusMart <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "CampusMart Email Verification",
      html: `
        <div style="font-family:sans-serif; padding:10px;">
          <h2>CampusMart Verification Code</h2>
          <p>Your verification code is:</p>
          <h1 style="color:#2b6cb0;">${otp}</h1>
          <p>This code will expire in <b>10 minutes</b>.</p>
        </div>
      `,
    });
    console.log("Email sent successfully to", email);
  } catch (err) {
    console.error("Email send failed:", err);
  }
};

module.exports=sendVerificationEmail