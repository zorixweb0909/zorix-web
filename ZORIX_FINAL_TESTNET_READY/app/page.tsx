import Link from "next/link";
const features=[
  ["Deposit","Use the configured TRC20 receiving address and keep the transaction hash for review."],
  ["Withdraw","Create a withdrawal request with a destination TRON address and amount."],
  ["Staking","Choose Starter, Growth, Long Term, Annual or Elite lock plans."],
  ["Referral","Generate and share a personal referral code from one dashboard."],
];
const steps=[["01","Connect","Connect a compatible TRON wallet without sharing a seed phrase."],["02","Choose","Open Deposit, Withdraw, Staking or Referral from the main menu."],["03","Track","Review request status and activity history from your dashboard."]];
export default function Home(){return <main className="home">
  <section className="heroPro"><div className="gridGlow"/><div className="orb orb1"/><div className="orb orb2"/>
    <div className="heroCopy"><div className="badge">✦ ZORIX • TRON WEB3 PORTAL</div><h1>Your gateway to <span>Web3 control.</span></h1><p>One professional workspace for wallet connection, TRC20 deposit requests, withdrawal requests, lock plans, activity history and referrals.</p><div className="actions"><Link className="primary" href="/dashboard">Open Dashboard →</Link><Link className="secondary" href="/staking">View Lock Plans</Link></div><div className="trust"><span>● Wallet-first</span><span>● TRON / TRC20</span><span>● Desktop & mobile</span></div></div>
    <div className="heroCard"><div className="heroTop"><span className="liveDot">●</span> ZORIX CONTROL CENTER</div><div className="walletVisual"><div className="walletMark">Z</div><div className="coin c1">USDT</div><div className="coin c2">TRX</div><div className="coin c3">₮</div></div><div className="heroStats"><div><span>NETWORK</span><b>TRON</b></div><div><span>ASSET</span><b>USDT</b></div><div><span>ACCESS</span><b>WEB3</b></div></div><p className="muted">Your private key and recovery phrase are never requested by ZORIX.</p></div>
  </section>
  <section className="featureSection"><div className="sectionHead"><p className="eyebrow">CORE WORKSPACE</p><h2>Every important action is one click away.</h2><p className="sub">The main menu gives direct access to the complete ZORIX workspace.</p></div><div className="featureGrid">{features.map(([title,text],i)=><Link href={`/${title.toLowerCase()}`} className="featureCard" key={title}><span className="featureNum">0{i+1}</span><h3>{title}</h3><p>{text}</p><b>Open {title} →</b></Link>)}</div></section>
  <section className="flowSection"><p className="eyebrow">HOW IT WORKS</p><h2>Simple workflow. Clear navigation.</h2><div className="flowGrid">{steps.map(([n,t,d])=><div className="flowCard" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div></section>
  <section className="infoBand"><div><p className="eyebrow">SECURITY FIRST</p><h2>Your wallet stays under your control.</h2><p className="sub">ZORIX is designed to use public wallet addresses and never asks users to enter a seed phrase or private key.</p></div><div className="infoCols"><div><b>Public address only</b><p>Connection stores the public address for the interface profile.</p></div><div><b>Clear request status</b><p>Deposit and withdrawal requests can be tracked from the dashboard and history.</p></div><div><b>Responsive workspace</b><p>Navigation and pages adapt for laptop, tablet and mobile screens.</p></div></div></section>
</main>}
