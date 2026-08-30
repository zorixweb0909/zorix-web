"use client";

export type Status = "Pending" | "Approved" | "Completed" | "Rejected";
export type ActivityType = "Deposit" | "Withdraw" | "Staking";

export type Item = {
  id: string;
  type: ActivityType;
  amount: string;
  tx: string;
  status: Status;
  date: string;
  address?: string;
  plan?: string;
  note?: string;
};

const KEY = "zorix_activity_v3_tron_manual";

export function loadItems(): Item[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveItems(items: Item[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("zorix-data"));
}

export function addItem(item: Omit<Item, "id" | "date">) {
  const record: Item = {
    ...item,
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    date: new Date().toLocaleString(),
  };
  saveItems([record, ...loadItems()]);
  return record;
}

export function updateItem(id: string, patch: Partial<Item>) {
  saveItems(loadItems().map((item) => item.id === id ? { ...item, ...patch } : item));
}
