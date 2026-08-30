# ZORIX — Final Local Test / Deployment Candidate

## Included final UI flows
- Professional Home page and responsive navigation
- Dashboard
- TRON/TRC20 USDT deposit address, copy button, QR code and transaction-hash submission
- Compatible-wallet connection menu for TronLink, TokenPocket, Trust Wallet and Bitget Wallet where the desktop wallet injects a TRON provider
- Withdrawal request form with TRON address validation
- Final staking minimums: 30 days $10, 60 days $100, 180 days $500, 365 days $1,000, 730 days $5,000
- Referral link/code
- History
- Local test admin request manager

## Before deployment
1. Run `npm install`
2. Run `npm run build`
3. Run `npm run dev` and test every page
4. Deploy the same folder only after the local test passes

## Important production boundary
This package is a polished interface and local/manual request workflow. It does not automatically custody funds, credit deposits, pay withdrawals, or generate staking returns. A real public financial/crypto product needs secure server-side authentication, database/accounting, transaction verification, authorization controls, audit logs, monitoring, security review and applicable legal/compliance review. Never request or store a user's private key, seed phrase or recovery phrase.
