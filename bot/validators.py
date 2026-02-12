def validate_side(side: str):
    side = side.upper()
    if side not in ["BUY", "SELL"]:
        raise ValueError("Side must be BUY or SELL.")
    return side

def validate_order_type(order_type: str):
    order_type = order_type.upper()
    if order_type not in ["MARKET", "LIMIT"]:
        raise ValueError("Order type must be MARKET or LIMIT.")
    return order_type

def validate_quantity(quantity: float):
    if quantity <= 0:
        raise ValueError("Quantity must be positive.")
    return quantity

def validate_price(price: float, order_type: str):
    if order_type == "LIMIT" and (price is None or price <= 0):
        raise ValueError("Price must be provided and positive for LIMIT orders.")
    return price
