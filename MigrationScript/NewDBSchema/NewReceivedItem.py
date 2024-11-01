# =========================================================================================
# Created By  : Giuseppe Barbieri
# Created Date: October 2024
# =========================================================================================
class NewReceivedItem:
    def __init__(self, id: int, orderId: int, productId: int, quantity: int, cud: str, comment: str, finishedAdding: bool, createdAt: str, updatedAt: str):
        self.id = id
        self.orderId = orderId
        self.productId = productId
        self.quantity = quantity
        self.cud = cud
        self.comment = comment
        self.finishedAdding = finishedAdding
        self.createdAt = createdAt
        self.updatedAt = updatedAt
# =========================================================================================
# End
# =========================================================================================