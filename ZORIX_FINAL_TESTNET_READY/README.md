# ZORIX — Production deposit UI candidate

This build keeps the existing ZORIX UI and adds a real customer-side TRON/TRC20 USDT transfer flow through an injected TronLink wallet.

## What is live-capable
- Connect a TRON-compatible wallet.
- Display a configurable receiving TRON address and QR code.
- Customer enters a USDT amount and signs a TRC20 transfer in TronLink.
- The page captures the returned transaction hash and stores a local pending request.
- Customer can submit an existing transaction hash for verification.

## Critical production boundary
This frontend **does not automatically credit customer balances** and must not be treated as a complete custodial financial system. For real customer accounts, implement server-side authentication, a database ledger, blockchain confirmation/transaction verification, idempotency, admin authorization, audit logs, monitoring, and legal/compliance controls before advertising automatic deposits or returns.

Never ask for or store seed phrases/private keys.

## Vercel variables
Set these in Vercel Project Settings → Environment Variables, then redeploy:
- `NEXT_PUBLIC_DEPOSIT_ADDRESS` = your receiving TRON address
- `NEXT_PUBLIC_USDT_TRON_CONTRACT` = `TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t`
- `NEXT_PUBLIC_NETWORK_MODE` = `mainnet`

The USDT TRC20 contract is the official Tether contract listed for Tron. Verify the receiving address independently before accepting customer funds.
