import argparse
import logging

from bot.client import BinanceFuturesClient
from bot.orders import OrderManager
from bot.validators import (
    validate_side,
    validate_order_type,
    validate_quantity,
    validate_price,
)
from bot.logging_config import setup_logger

def main():
    setup_logger()
    logger = logging.getLogger("CLI")

    parser = argparse.ArgumentParser(description="Binance Futures Testnet Trading Bot")

    parser.add_argument("--symbol", required=True, help="Trading pair (e.g., BTCUSDT)")
    parser.add_argument("--side", required=True, help="BUY or SELL")
    parser.add_argument("--type", required=True, help="MARKET or LIMIT")
    parser.add_argument("--quantity", type=float, required=True, help="Order quantity")
    parser.add_argument("--price", type=float, help="Required for LIMIT orders")

    args = parser.parse_args()

    try:
        side = validate_side(args.side)
        order_type = validate_order_type(args.type)
        quantity = validate_quantity(args.quantity)
        price = validate_price(args.price, order_type)

        print("\n====== ORDER REQUEST SUMMARY ======")
        print(f"Symbol   : {args.symbol.upper()}")
        print(f"Side     : {side}")
        print(f"Type     : {order_type}")
        print(f"Quantity : {quantity}")
        if order_type == "LIMIT":
            print(f"Price    : {price}")
        print("===================================\n")

        client = BinanceFuturesClient().get_client()
        manager = OrderManager(client)

        response = manager.place_order(
            symbol=args.symbol,
            side=side,
            order_type=order_type,
            quantity=quantity,
            price=price,
        )

        print("ORDER SUCCESS")
        print("Order ID     :", response.get("orderId"))
        print("Status       :", response.get("status"))
        print("Executed Qty :", response.get("executedQty"))
        print("Avg Price    :", response.get("avgPrice", "N/A"))

    except Exception as e:
        print("ORDER FAILED")
        print(str(e))

if __name__ == "__main__":
    main()
