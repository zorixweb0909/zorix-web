"use client";
import { useEffect, useState } from "react";

function short(a:string){return a.length>16?`${a.slice(0,7)}...${a.slice(-6)}`:a}
declare global { interface Window { tronWeb?: any; tronLink?: any; tokenpocket?: any; bitkeep?: any } }

export default function WalletButton(){
 const [account,setAccount]=useState(""); const [busy,setBusy]=useState(false); const [open,setOpen]=useState(false); const [notice,setNotice]=useState("");
 const save=(addr:string, provider:string)=>{setAccount(addr);localStorage.setItem("zorix_tron_wallet",addr);localStorage.setItem("zorix_wallet_provider",provider);localStorage.setItem("zorix_profile",JSON.stringify({wallet:addr,network:"TRON / TRC20",provider,createdAt:new Date().toISOString()}));window.dispatchEvent(new Event("zorix-wallet"));};
 async function connectInjected(provider:string){
  setBusy(true);setNotice("");
  try{
   const tw=window.tronWeb;
   if(!tw?.ready){setNotice(`${provider} was not detected or is locked. Open/unlock a TRON-compatible wallet, then try again.`);return;}
   const addr=tw.defaultAddress?.base58;
   if(!addr) throw new Error("TRON address not available");
   save(addr,provider);setOpen(false);
  }catch(e:any){setNotice(e?.message||"Wallet connection failed.")}finally{setBusy(false)}
 }
 useEffect(()=>{const saved=localStorage.getItem("zorix_tron_wallet")||"";if(saved)setAccount(saved)},[]);
 return <div className="walletWrap">
  <button className="walletBtn" onClick={()=>account?setOpen(!open):setOpen(true)} disabled={busy}>{busy?"Connecting...":account?short(account):"Connect Wallet"}</button>
  {open&&<div className="walletMenu">
   <b>Connect a TRON-compatible wallet</b>
   <button onClick={()=>connectInjected("TronLink")}>TronLink</button>
   <button onClick={()=>connectInjected("TokenPocket")}>TokenPocket</button>
   <button onClick={()=>connectInjected("Trust Wallet")}>Trust Wallet</button>
   <button onClick={()=>connectInjected("Bitget Wallet")}>Bitget Wallet</button>
   <p className="small">Desktop connection depends on the wallet browser extension injecting a TRON provider. ZORIX never asks for a seed phrase or private key.</p>
   {account&&<button className="secondary" onClick={()=>{localStorage.removeItem("zorix_tron_wallet");localStorage.removeItem("zorix_wallet_provider");setAccount("");setOpen(false)}}>Disconnect</button>}
   {notice&&<div className="error">{notice}</div>}
  </div>}
 </div>
}
