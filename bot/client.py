import os
import logging
from binance.client import Client
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

BASE_URL = "https://testnet.binancefuture.com"

class BinanceFuturesClient:
    def __init__(self):
        api_key = os.getenv("BINANCE_API_KEY")
        api_secret = os.getenv("BINANCE_API_SECRET")

        if not api_key or not api_secret:
            raise ValueError("API credentials not found in environment variables.")

        self.client = Client(api_key, api_secret)
        self.client.FUTURES_URL = BASE_URL

        logger.info("Binance Futures Testnet client initialized.")

    def get_client(self):
        return self.client
