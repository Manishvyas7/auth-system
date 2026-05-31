import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOtpEmail(
  email: string,
  otp: string
) {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Password Reset OTP",
      html: `
        <div>
          <h2>Password Reset Request</h2>

          <p>Your OTP is:</p>

          <h1>${otp}</h1>

          <p>This OTP expires in 10 minutes.</p>
        </div>
      `,
    });
  } catch (error) {
    console.error(error);
  }
}