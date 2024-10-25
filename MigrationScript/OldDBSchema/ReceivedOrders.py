# =========================================================================================
# Created By  : Giuseppe Barbieri
# Created Date: October 2024
# =========================================================================================
class ReceivedOrder:
    def __init__(self, order_id: int, poNumber: str, product_Number: str, quantity: int, description: str,
                 cud: str, comments: str, date: str, time: str, purchased_from: str,
                 who_received: str, added_to_inventory: str):
        self.order_id = order_id
        self.poNumber = poNumber
        self.product_Number = product_Number
        self.quantity = quantity
        self.description = description
        self.cud = cud
        self.comments = comments
        self.date = date
        self.time = time
        self.purchased_from = purchased_from
        self.who_received = who_received
        self.added_to_inventory = added_to_inventory
# =========================================================================================
# End
# =========================================================================================