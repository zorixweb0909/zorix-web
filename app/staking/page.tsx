"use client";
import {useState} from "react";
import AppShell from "@/components/AppShell";
import {addItem} from "@/components/Data";
const plans=[
 {name:"Starter",duration:"30 Days",min:10,label:"10 USDT",tag:"Entry"},
 {name:"Growth",duration:"60 Days",min:100,label:"100 USDT",tag:"Popular"},
 {name:"Long Term",duration:"180 Days",min:500,label:"500 USDT",tag:"Extended"},
 {name:"Annual",duration:"365 Days",min:1000,label:"1,000 USDT",tag:"Yearly"},
 {name:"Elite",duration:"730 Days",min:5000,label:"5,000 USDT",tag:"Premium"}
];
export default function Staking(){
 const [plan,setPlan]=useState<typeof plans[number]|null>(null);const [amount,setAmount]=useState("");const [message,setMessage]=useState("");
 function submit(){if(!plan)return setMessage("Select a plan first.");const value=Number(amount);if(!Number.isFinite(value)||value<plan.min)return setMessage(`Minimum for ${plan.duration} is ${plan.label}.`);addItem({type:"Staking",amount:value.toFixed(2),tx:`STK-${Date.now()}`,status:"Pending",plan:`${plan.name} • ${plan.duration}`,note:"Request recorded for review. No yield or return is promised or automatically credited."});setMessage(`${plan.name} request for ${plan.duration} saved as Pending.`);setAmount("")}
 return <AppShell><main className="container"><p className="eyebrow">ZORIX LOCK PLANS</p><h1 className="title">Choose your lock period</h1><p className="sub">Select the plan that matches your preferred duration. Minimum amounts are applied automatically.</p><div className="warning">Requests are recorded for review. Returns are not guaranteed or automatically credited by this interface.</div>{message&&<div className={message.includes("saved")?"success":"error"}>{message}</div>}<div className="planGrid">{plans.map(p=><button key={p.name} className={`planCard ${plan?.name===p.name?"selected":""}`} onClick={()=>{setPlan(p);setMessage("")}}><span className="planTag">{p.tag}</span><strong>{p.duration}</strong><h2>{p.name}</h2><p>Minimum {p.label}</p><b>{plan?.name===p.name?"Selected ✓":"Select plan"}</b></button>)}</div>{plan&&<section className="panel narrow"><h2>{plan.name} — {plan.duration}</h2><p className="muted">Minimum amount: {plan.label}</p><label>Amount (USDT)<input className="input" type="number" min={plan.min} step="0.01" value={amount} onChange={e=>setAmount(e.target.value)} placeholder={plan.min.toString()}/></label><button className="button topGap" onClick={submit}>Continue with {plan.name}</button></section>}</main></AppShell>}
