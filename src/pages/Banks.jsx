import { useEffect, useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { API_URL } from "../api";

export default function Banks() {
  const [banks, setBanks] = useState([]);
  const [form, setForm] = useState({ bankName: "", accountNumber: "", ifsc: "", branch: "" });
  const token = localStorage.getItem("token");

  const load = () => {
    fetch(`${API_URL}/api/bank`, {
      headers: { Authorization: "Bearer " + token }
    }).then(r => r.json()).then(setBanks);
  };

  useEffect(() => {
  if (token) load();
}, [token]);

  const submit = async () => {
    await fetch(`${API_URL}/api/bank`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(form)
    });
    setForm({ bankName: "", accountNumber: "", ifsc: "", branch: "" });
    load();
  };

  return (
    <>
      <h3>Banks</h3>

      <Form className="mb-3">
        <Form.Control className="mb-2" placeholder="Bank Name" value={form.bankName}
          onChange={e => setForm({ ...form, bankName: e.target.value })} />
        <Form.Control className="mb-2" placeholder="Account Number" value={form.accountNumber}
          onChange={e => setForm({ ...form, accountNumber: e.target.value })} />
        <Form.Control className="mb-2" placeholder="IFSC" value={form.ifsc}
          onChange={e => setForm({ ...form, ifsc: e.target.value })} />
        <Form.Control className="mb-2" placeholder="Branch" value={form.branch}
          onChange={e => setForm({ ...form, branch: e.target.value })} />
        <Button onClick={submit}>Save</Button>
      </Form>

      <Table striped bordered>
        <thead>
          <tr><th>Bank</th><th>IFSC</th><th>Branch</th></tr>
        </thead>
        <tbody>
          {banks.map(b => (
            <tr key={b.id}>
              <td>{b.bank_name}</td>
              <td>{b.ifsc}</td>
              <td>{b.branch}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
