import React, { useState } from "react";
import axios from "axios";

function AdminPanel() {
  const [userAddress, setUserAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const requestTransaction = async () => {
    await axios.post("https://your-backend-url/api/request-transaction", {
      userAddress,
      amount,
      description,
    });
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <input
        type="text"
        placeholder="User Address"
        value={userAddress}
        onChange={(e) => setUserAddress(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={requestTransaction}>Request Transaction</button>
    </div>
  );
}

export default AdminPanel;
