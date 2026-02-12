import logging
from binance.exceptions import BinanceAPIException

logger = logging.getLogger(__name__)

class OrderManager:
    def __init__(self, client):
        self.client = client

    def place_order(self, symbol, side, order_type, quantity, price=None):
        try:
            logger.info(
                f"Placing order: symbol={symbol}, side={side}, "
                f"type={order_type}, quantity={quantity}, price={price}"
            )

            params = {
                "symbol": symbol.upper(),
                "side": side,
                "type": order_type,
                "quantity": quantity,
            }

            if order_type == "LIMIT":
                params["price"] = price
                params["timeInForce"] = "GTC"

            response = self.client.futures_create_order(**params)

            logger.info(f"Order response: {response}")

            return response

        except BinanceAPIException as e:
            logger.error(f"Binance API Error: {e.message}")
            raise

        except Exception:
            logger.exception("Unexpected error occurred while placing order.")
            raise
