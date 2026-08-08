/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from "crypto"; // Use this instead of require

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY!;

export const paystack = {
  initialize: async (email: string, amount: number, metadata: any) => {
    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amount * 100,
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?status=success`,
        metadata,
      }),
    });
    return res.json();
  },
  
  verifySignature: (body: string, signature: string) => {
    const hash = crypto
      .createHmac("sha512", PAYSTACK_SECRET)
      .update(body)
      .digest("hex");
    return hash === signature;
  },
};