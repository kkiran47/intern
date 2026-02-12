# Binance Futures Testnet Trading Bot

## Setup

1. Create Binance Futures Testnet Account
2. Generate API key & secret
3. Create .env file:

BINANCE_API_KEY=your_key
BINANCE_API_SECRET=your_secret

4. Install dependencies:

pip install -r requirements.txt

## How to Run

### MARKET Order

python cli.py --symbol BTCUSDT --side BUY --type MARKET --quantity 0.001

### LIMIT Order

python cli.py --symbol BTCUSDT --side SELL --type LIMIT --quantity 0.001 --price 60000

## Logs

Logs are saved in:

logs/trading_bot.log

## Assumptions

- Hedge mode disabled
- Quantity respects Binance lot size
- Using USDT-M Futures Testnet
