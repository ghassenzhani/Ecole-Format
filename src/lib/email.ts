/**
 * This is a Mock Email Service.
 * In production, you would replace this with Resend, Sendgrid, or Nodemailer.
 */

export async function sendEmail(to: string, subject: string, body: string) {
  console.log("\n==============================");
  console.log(`📧 MOCK EMAIL SENT`);
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`------------------------------`);
  console.log(body);
  console.log("==============================\n");
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
}
