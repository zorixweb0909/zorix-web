"use client";
import { useEffect, useState } from "react";

function short(a: string) {
  return a.length > 16 ? `${a.slice(0, 7)}...${a.slice(-6)}` : a;
}

declare global {
  interface Window {
    tronWeb?: any;
    tronLink?: any;
    tokenpocket?: any;
    bitkeep?: any;
    trustwallet?: any;
  }
}

export default function WalletButton() {
  const [account, setAccount] = useState("");
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const save = (addr: string, provider: string) => {
    setAccount(addr);
    localStorage.setItem("zorix_tron_wallet", addr);
    localStorage.setItem("zorix_wallet_provider", provider);
    localStorage.setItem("zorix_profile", JSON.stringify({ wallet: addr, network: "TRON / TRC20", provider, createdAt: new Date().toISOString() }));
    window.dispatchEvent(new Event("zorix-wallet"));
  };

  function getTronWeb() {
    const candidates = [window.tronWeb, window.tronLink?.tronWeb, window.tokenpocket?.tronWeb, window.bitkeep?.tronWeb, window.trustwallet?.tronWeb];
    return candidates.find((x) => x?.defaultAddress?.base58 || x?.ready) || null;
  }

  async function connectInjected(provider: string) {
    setBusy(true); setNotice("");
    try {
      const tw = getTronWeb();
      if (!tw?.ready) {
        setNotice(`${provider} is not available in this browser. On mobile, open the ZORIX link inside the wallet's built-in DApp/browser, unlock the wallet, then tap Connect Wallet again.`);
        return;
      }
      const addr = tw.defaultAddress?.base58;
      if (!addr) throw new Error("TRON address is not available from the wallet.");
      save(addr, provider); setOpen(false);
    } catch (e: any) {
      setNotice(e?.message || "Wallet connection failed.");
    } finally { setBusy(false); }
  }

  useEffect(() => {
    const refresh = () => { const saved = localStorage.getItem("zorix_tron_wallet") || ""; if (saved) setAccount(saved); };
    refresh();
    const onAccountsChanged = () => { const tw = getTronWeb(); const addr = tw?.defaultAddress?.base58; if (addr) save(addr, localStorage.getItem("zorix_wallet_provider") || "TRON wallet"); };
    window.addEventListener("zorix-wallet", refresh);
    window.addEventListener("accountsChanged", onAccountsChanged as EventListener);
    return () => { window.removeEventListener("zorix-wallet", refresh); window.removeEventListener("accountsChanged", onAccountsChanged as EventListener); };
  }, []);

  const disconnect = () => {
    localStorage.removeItem("zorix_tron_wallet"); localStorage.removeItem("zorix_wallet_provider"); localStorage.removeItem("zorix_profile");
    setAccount(""); setOpen(false); setNotice(""); window.dispatchEvent(new Event("zorix-wallet"));
  };

  return <div className="walletWrap">
    <button className="walletBtn" onClick={() => account ? setOpen(!open) : setOpen(true)} disabled={busy}>
      {busy ? "Connecting..." : account ? short(account) : "Connect Wallet"}
    </button>
    {open && <div className="walletMenu" role="dialog" aria-label="Connect wallet">
      <div className="walletMenuHead"><b>{account ? "Wallet connected" : "Connect a TRON-compatible wallet"}</b><button className="walletClose" onClick={() => setOpen(false)} aria-label="Close wallet menu">×</button></div>
      {account && <div className="small">Connected: {short(account)} • TRON</div>}
      {!account && <>
        <button onClick={() => connectInjected("TronLink")}>TronLink</button>
        <button onClick={() => connectInjected("TokenPocket")}>TokenPocket</button>
        <button onClick={() => connectInjected("Trust Wallet")}>Trust Wallet</button>
        <button onClick={() => connectInjected("Bitget Wallet")}>Bitget Wallet</button>
        <div className="walletMobileHint"><b>Mobile:</b> Chrome may not expose the wallet provider. Open this same ZORIX URL inside the wallet's DApp/browser, unlock it, then connect again.</div>
        <p className="small">ZORIX never asks for a seed phrase or private key.</p>
      </>}
      {account && <button className="secondary" onClick={disconnect}>Disconnect</button>}
      {notice && <div className="error">{notice}</div>}
    </div>}
  </div>;
}
