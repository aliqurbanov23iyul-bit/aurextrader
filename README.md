# Nexora Markets V2

A rebuilt, full-stack **virtual trading demo**.

## Included
- Modern responsive landing page
- 15 crypto markets with real public market-price proxy
- Coin icons
- Dedicated Markets page
- Trading terminal with chart/timeframes
- Virtual BUY/SELL market orders
- Portfolio, positions, average cost basis and unrealized P/L
- 8-digit numeric Account ID
- Registration/login with bcrypt + JWT
- Transaction/ledger history
- Withdrawal-request workflow (m10/Birbank/Visa/Mastercard UI)
- Admin: account lookup, balance adjustment with required reason, withdrawal review, audit log, settings
- About, support/FAQ and license placeholder
- Neon PostgreSQL + Vercel serverless API

## Deploy
1. Create Neon database.
2. Deploy to Vercel.
3. Add DATABASE_URL, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD.
4. POST once to `/api/setup`.
5. Remove/disable `api/setup.js` after initialization.

## Important
This build intentionally implements **virtual trading**, not real custody/payment execution.
It does not collect CVV, PIN, OTP, banking passwords, seed phrases, or private keys.
Market endpoints proxy public Binance market data and may need replacement if that source is unavailable in your deployment region.
For real-money/crypto operation, use appropriately licensed payment/custody/exchange infrastructure and obtain legal/compliance review.
Only publish genuine, verifiable license information.
