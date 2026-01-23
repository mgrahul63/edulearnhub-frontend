import customaxios from "../axios";

export const paymentsAPI = async (data) => {
  try {
    const res = await customaxios.post("api/payments/process-payment", data);
    return res.data;
  } catch (error) {
    console.error("Payment processing failed:", error);
    throw error;
  }
};
