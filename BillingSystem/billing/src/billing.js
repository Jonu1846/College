import React, { useState } from "react";

function Billing() {
  const [amount, setAmount] = useState("");
  const [discount, setDiscount] = useState("");
  const [total, setTotal] = useState(0);

  const calculateBill = () => {
    let amt = amount === "" ? 0 : parseFloat(amount);
    let d = discount === "" ? 0 : parseFloat(discount);

    let discountAmt = (amt * d) / 100;
    let finalTotal = amt - discountAmt;

    setTotal(finalTotal.toFixed(2));
  };

  return (
    <div style={{ 
      margin: "20px auto", 
      padding: "20px", 
      border: "1px solid #aaa", 
      borderRadius: "5px", 
      width: "300px" 
    }}>
      <h2 style={{ textAlign: "center" }}>Billing System</h2>

      <label>Amount: </label><br />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ width: "100%", margin: "5px 0", padding: "5px" }}
      /><br />

      <label>Discount (%): </label><br />
      <input
        type="number"
        value={discount}
        onChange={(e) => setDiscount(e.target.value)}
        style={{ width: "100%", margin: "5px 0", padding: "5px" }}
      /><br />

      <button 
        onClick={calculateBill} 
        style={{ width: "100%", padding: "8px", marginTop: "10px", cursor: "pointer" }}
      >
        Calculate
      </button>

      <h3 style={{ textAlign: "center", marginTop: "15px" }}>
        Final Bill: ₹{total}
      </h3>
    </div>
  );
}

export default Billing;
