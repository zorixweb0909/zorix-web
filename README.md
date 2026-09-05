# ZORIX — Persistent Web3 dashboard foundation

This package keeps the ZORIX TRON/TRC20 deposit UI, withdrawal requests, staking requests, referral UI, history and admin request manager, and adds **real multi-user persistence through Supabase Auth + Postgres/RLS**.

## Important boundary
This is not a custodial exchange or an automatic investment/return engine. Deposits are credited only after independent verification, withdrawals are manual, and staking requests do not promise a yield. Do not request or store seed phrases/private keys.

## A-to-Z setup
1. Create a Supabase project.
2. Open **SQL Editor** and run `supabase_schema.sql`.
3. In Supabase Authentication, choose your email-confirmation policy.
4. Copy Project URL and anon/public key.
5. Copy `.env.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_DEPOSIT_ADDRESS` (your verified TRON receiving address)
   - `NEXT_PUBLIC_USDT_TRON_CONTRACT`
   - `NEXT_PUBLIC_NETWORK_MODE`
6. Run `npm install` then `npm run dev`.
7. Create an account at `/signup`.
8. After creating the admin account, in Supabase SQL Editor run:
   `update public.profiles set is_admin=true where email='YOUR-ADMIN-EMAIL';`
9. Open `/admin` while signed in with that admin account.
10. For Vercel, add the same environment variables in Project Settings → Environment Variables, then redeploy.

## Real deposit verification
The customer-side TronLink transfer captures a transaction hash, but this browser must not be trusted to credit balances. Before accepting real funds, add a server-side TRON/TRC20 verifier that checks recipient, token contract, amount, confirmations/finality and prevents duplicate transaction hashes. Until that service is installed, keep deposits manual.

## Production checklist
- Supabase Auth + RLS configured
- Unique/idempotent transaction ledger
- Server-side TRON verification
- Admin authorization and audit trail
- Withdrawal approval controls and payout reconciliation
- Rate limits, abuse protection and monitoring
- KYC/AML, consumer disclosures, tax and other applicable legal/compliance review
- Never store seed phrases or private keys
