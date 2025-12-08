import Razorpay from "razorpay";
import crypto from "crypto";

const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

if (!RAZORPAY_KEY_SECRET && process.env.NODE_ENV !== "production") {
  console.warn(
    "⚠️ RAZORPAY_KEY_SECRET not defined. Payment features will not work."
  );
}

if (!RAZORPAY_KEY_ID && process.env.NODE_ENV !== "production") {
  console.warn(
    "⚠️ NEXT_PUBLIC_RAZORPAY_KEY_ID not defined. Payment features will not work."
  );
}

/**
 * Razorpay instance for server-side operations
 */
export const razorpayInstance =
  RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET
    ? new Razorpay({
        key_id: RAZORPAY_KEY_ID,
        key_secret: RAZORPAY_KEY_SECRET,
      })
    : null;

/**
 * Verify Razorpay payment signature
 * @param orderId - Razorpay order ID
 * @param paymentId - Razorpay payment ID
 * @param signature - Razorpay signature from client
 * @returns boolean - true if signature is valid
 */
export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  if (!RAZORPAY_KEY_SECRET) {
    throw new Error("RAZORPAY_KEY_SECRET is not defined");
  }
  const generatedSignature = crypto
    .createHmac("sha256", RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return generatedSignature === signature;
}

/**
 * Verify Razorpay webhook signature
 * @param body - Raw webhook body string
 * @param signature - X-Razorpay-Signature header value
 * @returns boolean - true if webhook signature is valid
 */
export function verifyWebhookSignature(
  body: string,
  signature: string
): boolean {
  if (!process.env.RAZORPAY_WEBHOOK_SECRET) {
    throw new Error("RAZORPAY_WEBHOOK_SECRET is not defined");
  }

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(body)
    .digest("hex");

  return expectedSignature === signature;
}

/**
 * Issue refund for a payment
 * @param paymentId - Razorpay payment ID
 * @param amount - Amount in paise (optional, full refund if not specified)
 * @returns Refund object from Razorpay
 */
export async function issueRefund(paymentId: string, amount?: number) {
  if (!razorpayInstance) {
    throw new Error("Razorpay instance not initialized");
  }

  try {
    const refundData: { payment_id: string; amount?: number } = {
      payment_id: paymentId,
    };

    if (amount) {
      refundData.amount = amount; // amount in paise
    }

    const refund = await razorpayInstance.payments.refund(
      paymentId,
      refundData
    );
    console.log("✅ Refund issued:", refund.id);
    return refund;
  } catch (error) {
    console.error("❌ Refund failed:", error);
    throw error;
  }
}
