import nodemailer from "nodemailer";

if (
  !process.env.EMAIL_HOST ||
  !process.env.EMAIL_USER ||
  !process.env.EMAIL_PASS
) {
  console.warn(
    "⚠️ Email environment variables not configured. Emails will not be sent."
  );
}

/**
 * Nodemailer transporter for Zoho SMTP
 */
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.zoho.com",
  port: parseInt(process.env.EMAIL_PORT || "465"),
  secure: true, // SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send booking confirmation email
 * @param to - Recipient email
 * @param bookingDetails - Object containing booking information
 */
export async function sendBookingConfirmation(
  to: string,
  bookingDetails: {
    clientName: string;
    doctorName: string;
    date: string;
    timeSlot: string;
    amountPaid: number;
    bookingId: string;
  }
) {
  try {
    const mailOptions = {
      from: `"Physiologist Platform" <${process.env.EMAIL_USER}>`,
      to,
      subject: "✅ Booking Confirmed - Physiologist Consultation",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1c4966; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #ffffff; }
            .header { background: #1c4966; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { padding: 30px 20px; background: #f9f9f9; }
            .detail-row { margin: 12px 0; padding: 10px; background: white; border-left: 4px solid #5f8b70; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
            .button { display: inline-block; padding: 12px 24px; background: #5f8b70; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Your appointment is confirmed!</h1>
            </div>
            <div class="content">
              <p>Dear <strong>${bookingDetails.clientName}</strong>,</p>
              <p>Your consultation has been successfully booked. Here are the details:</p>
              
              <div class="detail-row">
                <strong>Doctor:</strong> ${bookingDetails.doctorName}
              </div>
              <div class="detail-row">
                <strong>Date:</strong> ${bookingDetails.date}
              </div>
              <div class="detail-row">
                <strong>Time:</strong> ${bookingDetails.timeSlot}
              </div>
              <div class="detail-row">
                <strong>Amount Paid:</strong> ₹${bookingDetails.amountPaid}
              </div>
              <div class="detail-row">
                <strong>Booking ID:</strong> ${bookingDetails.bookingId}
              </div>

              <p style="margin-top: 20px;">You will receive a meeting link 24 hours before your appointment.</p>
              
              <p style="margin-top: 20px; font-size: 14px; color: #666;">
                If you need to reschedule or cancel, please contact us at least 24 hours in advance.
              </p>
            </div>
            <div class="footer">
              <p>Physiologist Consultation Platform</p>
              <p>Powered by reliable scheduling & secure payments</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw error;
  }
}

/**
 * Send refund notification email
 * @param to - Recipient email
 * @param refundDetails - Object containing refund information
 */
export async function sendRefundNotification(
  to: string,
  refundDetails: {
    clientName: string;
    amount: number;
    reason: string;
    refundId: string;
  }
) {
  try {
    const mailOptions = {
      from: `"Physiologist Platform" <${process.env.EMAIL_USER}>`,
      to,
      subject: "💰 Refund Processed - Physiologist Consultation",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1c4966; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #ffffff; }
            .header { background: #1c4966; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { padding: 30px 20px; background: #f9f9f9; }
            .detail-row { margin: 12px 0; padding: 10px; background: white; border-left: 4px solid #8fbdd7; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>💰 Refund Processed</h1>
            </div>
            <div class="content">
              <p>Dear <strong>${refundDetails.clientName}</strong>,</p>
              <p>A refund has been initiated to your original payment method.</p>
              
              <div class="detail-row">
                <strong>Amount:</strong> ₹${refundDetails.amount}
              </div>
              <div class="detail-row">
                <strong>Reason:</strong> ${refundDetails.reason}
              </div>
              <div class="detail-row">
                <strong>Refund ID:</strong> ${refundDetails.refundId}
              </div>

              <p style="margin-top: 20px;">The refund will reflect in your account within 5-7 business days.</p>
            </div>
            <div class="footer">
              <p>Physiologist Consultation Platform</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Refund email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Refund email failed:", error);
    throw error;
  }
}
