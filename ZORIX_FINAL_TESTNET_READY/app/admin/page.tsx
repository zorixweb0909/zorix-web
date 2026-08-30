"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import { loadItems, updateItem, Item, Status } from "@/components/Data";

const statuses: Status[] = ["Pending", "Approved", "Completed", "Rejected"];

export default function Admin() {
  const [items, setItems] = useState<Item[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const refresh = () => setItems(loadItems());
    refresh();
    window.addEventListener("zorix-data", refresh);
    return () => window.removeEventListener("zorix-data", refresh);
  }, []);

  function changeStatus(id: string, status: Status) {
    updateItem(id, { status });
    setMessage(`Request updated to ${status}.`);
  }

  function setHash(id: string) {
    const hash = window.prompt("Enter payment transaction hash/reference:");
    if (hash?.trim()) {
      updateItem(id, { tx: hash.trim(), status: "Completed" });
      setMessage("Payment reference saved and request marked Completed.");
    }
  }

  return (
    <AppShell>
      <main className="container">
        <h1 className="title">Admin Request Manager</h1>
        <p className="sub">Local TESTNET demo admin screen. It is not secure authentication and is disabled for production use by design.</p>
        <div className="warning">Before any production launch, implement server-side authentication, database permissions, audit logs, role-based access, monitoring, legal/compliance review and independent security testing.</div>
        {message && <div className="success">{message}</div>}
        <section className="panel">
          {items.length === 0 ? <p className="muted">No requests yet.</p> :
            <div className="adminList">{items.map((x) => <div className="request" key={x.id}>
              <div><strong>{x.type}</strong> {x.plan ? `• ${x.plan}` : ""}<div className="muted">{x.amount} USDT • {x.date}</div>
              <div className="small">{x.address || x.tx}</div></div>
              <div className="row">
                <select className="select" value={x.status} onChange={(e) => changeStatus(x.id, e.target.value as Status)}>
                  {statuses.map((s) => <option key={s}>{s}</option>)}
                </select>
                {x.type === "Withdraw" && <button className="secondary" onClick={() => setHash(x.id)}>Add Tx Hash</button>}
              </div>
            </div>)}</div>}
        </section>
      </main>
    </AppShell>
  );
}
