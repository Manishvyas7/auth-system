import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(
  email: string,
  name: string
) {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Welcome!",
      html: `
        <div>
          <h1>Welcome ${name}</h1>
          <p>Your account has been created.</p>

          <a href="http://localhost:3000/dashboard">
            Go To Dashboard
          </a>
        </div>
      `,
    });
  } catch (err) {
    console.log(err);
  }
}