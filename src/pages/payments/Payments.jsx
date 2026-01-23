import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useApp } from "../../hooks/useApp";
import { paymentsAPI } from "../../services/api/payments";
const Payments = () => {
  const { userinfo } = useApp();
  const { state } = useLocation();
  const navigate = useNavigate();

  const course = state?.course;
  const price = course?.price || 0;
  const instructorId = course?.instructorId || null;
  const categoryId = course?.categoryId || null;
  const courseId = course?.id || null;
  const category_name = course?.category_name || "N/A";

  const [method, setMethod] = useState("");
  const [mobile, setMobile] = useState("");
  const [trxId, setTrxId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!method) {
      setError("Please select a payment method.");
      return;
    }

    if ((method === "bkash" || method === "nagad") && (!mobile || !trxId)) {
      setError("Mobile number and transaction ID are required.");
      return;
    }

    setError("");
    setLoading(true);

    const payload = {
      courseId,
      instructorId,
      categoryId,
      amount: price,
      paymentMethod: method,
      mobileNumber: mobile,
      transactionId: trxId,
      userId: userinfo?.id,
    };

    try {
      console.log("Payment payload:", payload);
      const res = await paymentsAPI(payload); // mock API call
      // later: axios.post("/api/payments", payload)
      console.log(res);
      if (res.success) {
        toast.success(res.message || "Payment successful!");
        navigate(-1); // success page later
      }
    } catch (err) {
      setError("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Complete Your Payment</h2>

      <div className="mb-4 text-sm">
        <p>
          <strong>Payments for</strong>{" "}
          <span className="text-red-500">{category_name}</span>
        </p>
        <p>
          <strong>Total Amount:</strong> ৳{price}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Payment Method */}
        <div>
          <label className="block mb-1 font-medium">Payment Method</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select method</option>
            <option value="bkash">bKash</option>
            <option value="nagad">Nagad</option>
            <option value="card">Card</option>
          </select>
        </div>

        {/* Mobile payment fields */}
        {(method === "bkash" || method === "nagad") && (
          <>
            <div>
              <label className="block mb-1">Mobile Number</label>
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="01XXXXXXXXX"
              />
            </div>

            <div>
              <label className="block mb-1">Transaction ID</label>
              <input
                type="text"
                value={trxId}
                onChange={(e) => setTrxId(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="Transaction ID"
              />
            </div>
          </>
        )}

        {/* Card info (basic placeholder) */}
        {method === "card" && (
          <p className="text-sm text-gray-600">
            Card payment integration will be added later.
          </p>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Submit Payment"}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 bg-gray-300 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Payments;
