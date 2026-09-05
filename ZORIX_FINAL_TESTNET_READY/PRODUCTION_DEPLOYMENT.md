# ZORIX Deployment Status

This build supports:
- Real TRON/TRC20 USDT transfer initiation through TronLink.
- Customer-side transaction hash capture.
- Manual withdrawal request flow.
- Manual staking request flow.
- Referral and history UI.

## Important production requirement
This frontend alone cannot safely provide automatic customer balance crediting. Vercel serverless functions are not a persistent database. Before accepting customer funds as account balances, connect a real database/authentication/ledger service and verify deposits server-side.

Never put a seed phrase or private key in Vercel, GitHub, or the browser.

## Vercel environment variables
NEXT_PUBLIC_NETWORK_MODE=mainnet
NEXT_PUBLIC_DEPOSIT_ADDRESS=<YOUR TRON RECEIVING ADDRESS>
NEXT_PUBLIC_USDT_TRON_CONTRACT=TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t

After setting variables, redeploy.
