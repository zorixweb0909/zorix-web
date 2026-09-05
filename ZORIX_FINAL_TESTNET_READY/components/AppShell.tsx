"use client";
import Link from "next/link";
import {useState} from "react";
import WalletButton from "./WalletButton";
const links=[["Home","/"],["Dashboard","/dashboard"],["Deposit","/deposit"],["Withdraw","/withdraw"],["Staking","/staking"],["Referral","/referral"],["History","/history"],["Admin","/admin"]];
export default function AppShell({children}:{children:React.ReactNode}){const [open,setOpen]=useState(false);return <div className="shell"><nav className="nav"><Link href="/" className="brand"><span>Z</span> ZORIX</Link><button className="menuToggle" onClick={()=>setOpen(!open)} aria-label="Open navigation">☰</button><div className={`links ${open?"mobileOpen":""}`}>{links.map(([n,h])=><Link key={h} href={h} onClick={()=>setOpen(false)}>{n}</Link>)}</div><div className="navWallet"><WalletButton/></div></nav>{children}<footer className="footer"><b>ZORIX</b><span>Web3 interface • Never share your recovery phrase</span><Link href="/">Home</Link></footer></div>}
