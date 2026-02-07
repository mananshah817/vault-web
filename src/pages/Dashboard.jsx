import { useEffect, useState } from "react";
import { API_URL } from "../api";

export default function Dashboard() {
  const [banks, setBanks] = useState([]);
  const token = localStorage.getItem("token");

useEffect(() => {
  if (!token) return;
  fetch(`${API_URL}/api/bank`, {
    headers: { Authorization: "Bearer " + token }
  })
    .then(r => r.json())
    .then(setBanks);
}, [token]);



  return (
    <div>
      <h2>Dashboard</h2>
      <h4>Your Banks</h4>
      <ul>
        {banks.map(b => (
          <li key={b.id}>{b.bank_name} - {b.ifsc}</li>
        ))}
      </ul>
    </div>
  );
}
