# =========================================================================================
# Created By  : Giuseppe Barbieri
# Created Date: October 2024
# =========================================================================================
class Quotes:
    def __init__(self, quote_id: int, product_number: str, username: str, quoted_price: float, quantity: int,
                 date_quoted: str, companyID: int, sold: str, customer_target_price: float, comments: str):
        self.quote_id = quote_id
        self.product_number = product_number
        self.username = username
        self.quoted_price = quoted_price
        self.quantity = quantity
        self.date_quoted = date_quoted
        self.companyID = companyID
        self.sold = sold
        self.customer_target_price = customer_target_price
        self.comments = comments
# =========================================================================================
# End
# =========================================================================================