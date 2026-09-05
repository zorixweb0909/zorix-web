"use client";
import { db } from "@/lib/supabase";
import { getToken, currentUser } from "@/lib/session";
export type Status = "Pending" | "Approved" | "Active" | "Completed" | "Rejected";
export type ActivityType = "Deposit" | "Withdraw" | "Staking" | "KYC";
export type Item = { id:string; user_id?:string; type:ActivityType; amount:string; tx:string; status:Status; date:string; address?:string; plan?:string; note?:string; };
function token(){const t=getToken();if(!t)throw new Error("Please sign in first.");return t;}
export async function loadItems():Promise<Item[]>{ const data=await db("activity?select=*&order=created_at.desc",token()); return (data as any[]).map(x=>({...x,date:x.created_at})) as Item[]; }
export async function addItem(item:Omit<Item,"id"|"date"|"user_id">){ const u=await currentUser(); if(!u?.id) throw new Error("Please sign in first."); const data=await db("activity",token(),{method:"POST",headers:{Prefer:"return=representation"},body:JSON.stringify({...item,user_id:u.id})}); window.dispatchEvent(new Event("zorix-data")); return data?.[0] as Item; }
export async function updateItem(id:string,patch:Partial<Item>){ await db(`activity?id=eq.${encodeURIComponent(id)}`,token(),{method:"PATCH",headers:{Prefer:"return=minimal"},body:JSON.stringify(patch)});window.dispatchEvent(new Event("zorix-data")); }
export async function getAvailableBalance(){const items=await loadItems();const d=items.filter(x=>x.type==="Deposit"&&x.status==="Approved").reduce((s,x)=>s+(Number(x.amount)||0),0);const st=items.filter(x=>x.type==="Staking"&&x.status==="Active").reduce((s,x)=>s+(Number(x.amount)||0),0);const w=items.filter(x=>x.type==="Withdraw"&&x.status==="Completed").reduce((s,x)=>s+(Number(x.amount)||0),0);return Math.max(0,d-st-w);}
export function notifyDataChanged(){window.dispatchEvent(new Event("zorix-data"));}
