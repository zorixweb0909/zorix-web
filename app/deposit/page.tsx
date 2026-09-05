"use client";
import {useState} from "react";
import AppShell from "@/components/AppShell";
import {addItem} from "@/components/Data";

const address=process.env.NEXT_PUBLIC_DEPOSIT_ADDRESS||"TLQ7q2QX5W94rHHzgBdUfABG5SvckYDnvt";
const USDT_CONTRACT=process.env.NEXT_PUBLIC_USDT_TRON_CONTRACT||"TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";

declare global { interface Window { tronWeb?: any } }

export default function Deposit(){
 const [amount,setAmount]=useState("");
 const [tx,setTx]=useState("");
 const [message,setMessage]=useState("");
 const [busy,setBusy]=useState(false);
 const copy=async()=>{await navigator.clipboard.writeText(address);setMessage("Receiving address copied.")};
 async function payWithTronLink(){
  setMessage("");
  const value=Number(amount);
  if(!Number.isFinite(value)||value<=0)return setMessage("Enter a valid USDT amount.");
  const tw=window.tronWeb;
  if(!tw?.ready)return setMessage("Please connect and unlock TronLink first.");
  const from=tw.defaultAddress?.base58;
  if(!from)return setMessage("TronLink did not provide your wallet address.");
  if(from===address)return setMessage("The connected wallet is the receiving wallet. Use the customer wallet to make a deposit.");
  setBusy(true);
  try{
   const contract=await tw.contract().at(USDT_CONTRACT);
   const units=Math.round(value*1_000_000).toString();
   const result=await contract.transfer(address,units).send({feeLimit:100_000_000,callValue:0,shouldPollResponse:true});
   const hash=typeof result==="string"?result:(result?.txid||result?.transaction?.txID||"");
   if(!hash)throw new Error("The wallet did not return a transaction hash. Check TronLink activity.");
   setTx(hash);
   addItem({type:"Deposit",amount:value.toFixed(2),tx:hash,status:"Pending",address,note:"On-chain transfer submitted by the connected wallet. Credit only after server-side verification."});
   setMessage("Deposit transaction submitted. Keep the transaction hash for verification.");
  }catch(e:any){
   setMessage(e?.message||"Transaction was rejected or failed. No deposit was recorded by this page.");
  }finally{setBusy(false)}
 }
 function submit(e:React.FormEvent){
  e.preventDefault();
  if(Number(amount)<=0||!tx.trim())return setMessage("Enter a valid amount and transaction hash.");
  addItem({type:"Deposit",amount,tx:tx.trim(),status:"Pending",address,note:"Manual verification required. Do not credit funds from client-side data alone."});
  setMessage("Deposit request saved as Pending for verification.");setAmount("");setTx("");
 }
 return <AppShell><main className="container"><p className="eyebrow">TRON / TRC20</p><h1 className="title">Deposit USDT</h1><p className="sub">Send USDT on TRON (TRC20) to the receiving address below. Always verify the network and address before signing.</p><div className="warning"><b>Production safety:</b> A blockchain transfer is real and irreversible. ZORIX should credit a customer only after server-side verification of the confirmed TRC20 transaction.</div>{message&&<div className={message.toLowerCase().includes("failed")||message.toLowerCase().includes("rejected")||message.toLowerCase().includes("valid")?"error":"success"}>{message}</div>}<div className="twoCol"><section className="panel"><h2>Receiving address</h2><div className="addressBox">{address}</div><img className="qr" src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(address)}`} alt="QR code for the TRON receiving address"/><div className="row"><button className="button" onClick={copy}>Copy Address</button><span className="muted">Network: TRON (TRC20)</span></div><p className="small">USDT contract: {USDT_CONTRACT}</p><p className="small">Never send another asset or another network to this address. Tether confirms USDT is supported on TRON as TRC20; selecting the wrong transport can result in loss.</p></section><section className="panel"><h2>Pay with connected wallet</h2><form className="form" onSubmit={e=>{e.preventDefault();payWithTronLink()}}><label>Amount (USDT)<input className="input" type="number" min="0" step="0.01" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="0.00"/></label><button className="button" disabled={busy}>{busy?"Waiting for TronLink...":"Send USDT with TronLink"}</button></form>{tx&&<div className="success"><b>Transaction hash</b><div className="small break">{tx}</div></div>}<hr/><h3>Already sent?</h3><form className="form" onSubmit={submit}><label>Transaction Hash<input className="input" value={tx} onChange={e=>setTx(e.target.value)} placeholder="Paste the confirmed on-chain transaction hash"/></label><button className="secondary">Submit for Verification</button></form></section></div></main></AppShell>}
