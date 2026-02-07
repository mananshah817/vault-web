import { useEffect, useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { API_URL } from "../api";

export default function Cards() {
  const [cards, setCards] = useState([]);
  const [form, setForm] = useState({ holderName: "", cardType: "", last4: "", expMonth: "", expYear: "" });
  const token = localStorage.getItem("token");

  const load = () => {
    fetch(`${API_URL}/api/card`, {
      headers: { Authorization: "Bearer " + token }
    }).then(r => r.json()).then(setCards);
  };

  useEffect(load, []);

  const submit = async () => {
    await fetch(`${API_URL}/api/card`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ ...form, expMonth: +form.expMonth, expYear: +form.expYear })
    });
    setForm({ holderName: "", cardType: "", last4: "", expMonth: "", expYear: "" });
    load();
  };

  return (
    <>
      <h3>Cards</h3>

      <Form className="mb-3">
        <Form.Control className="mb-2" placeholder="Holder Name" value={form.holderName}
          onChange={e => setForm({ ...form, holderName: e.target.value })} />
        <Form.Control className="mb-2" placeholder="Card Type" value={form.cardType}
          onChange={e => setForm({ ...form, cardType: e.target.value })} />
        <Form.Control className="mb-2" placeholder="Last 4 digits" value={form.last4}
          onChange={e => setForm({ ...form, last4: e.target.value })} />
        <Form.Control className="mb-2" placeholder="Exp Month" value={form.expMonth}
          onChange={e => setForm({ ...form, expMonth: e.target.value })} />
        <Form.Control className="mb-2" placeholder="Exp Year" value={form.expYear}
          onChange={e => setForm({ ...form, expYear: e.target.value })} />
        <Button onClick={submit}>Save</Button>
      </Form>

      <Table striped bordered>
        <thead>
          <tr><th>Holder</th><th>Type</th><th>Last4</th><th>Exp</th></tr>
        </thead>
        <tbody>
          {cards.map(c => (
            <tr key={c.id}>
              <td>{c.holder_name}</td>
              <td>{c.card_type}</td>
              <td>**** {c.last4}</td>
              <td>{c.exp_month}/{c.exp_year}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
