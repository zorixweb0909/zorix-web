# ZORIX A-to-Z deployment checklist

## 1. Database
Run `supabase_schema.sql` once in Supabase SQL Editor.

## 2. Account
Create `/signup` account. If confirmation is enabled, confirm email and use `/login`.

## 3. Admin
Set exactly one or more trusted admin profiles with the SQL statement in README. Do not create an admin toggle in the client UI.

## 4. Wallet
The current wallet button uses an injected TRON provider. On mobile, open the Vercel URL in the wallet's DApp browser.

## 5. Deposit address
Set `NEXT_PUBLIC_DEPOSIT_ADDRESS` to the verified receiving address. Test with a tiny amount before any public launch.

## 6. Deposit workflow
User signs a TRC20 transfer → transaction hash is recorded → admin independently verifies it → admin approves request. Do not auto-credit from client code.

## 7. Withdraw workflow
User enters a TRON destination and amount → Pending → admin approves → payment is made through your controlled operational process → admin records the real payment transaction hash → Completed.

## 8. Staking
Requests are stored as Pending/Active/Completed/Rejected. This build does not calculate or promise investment returns. Any real program requires a separately reviewed business, legal and accounting model.

## 9. Vercel
Add all `.env.local` values to Vercel Project Settings → Environment Variables for Production, Preview and Development as appropriate. Redeploy after changes.

## 10. Before public launch
Run a small end-to-end test with test accounts; verify RLS, admin access, transaction reconciliation, duplicate protection, withdrawal limits and backups. Do not advertise automatic profits or accept customer funds until the server-side verification and compliance work is complete.
