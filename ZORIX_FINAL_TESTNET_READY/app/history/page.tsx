"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import { loadItems, Item } from "@/components/Data";

export default function History() {
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    const refresh = () => setItems(loadItems());
    refresh();
    window.addEventListener("zorix-data", refresh);
    window.addEventListener("storage", refresh);
    return () => { window.removeEventListener("zorix-data", refresh); window.removeEventListener("storage", refresh); };
  }, []);

  return (
    <AppShell>
      <main className="container">
        <h1 className="title">History</h1>
        <p className="sub">All requests created in this browser demo.</p>
        <section className="panel">
          {items.length === 0 ? <p className="muted">No activity.</p> :
            <div className="tableWrap"><table className="table"><thead><tr><th>Type</th><th>Plan</th><th>Amount</th><th>Reference</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>{items.map((x) => <tr key={x.id}><td>{x.type}</td><td>{x.plan || "-"}</td><td>{x.amount} USDT</td><td>{x.tx.length > 24 ? `${x.tx.slice(0,24)}...` : x.tx}</td><td><span className="status">{x.status}</span></td><td>{x.date}</td></tr>)}</tbody>
            </table></div>}
        </section>
      </main>
    </AppShell>
  );
}
