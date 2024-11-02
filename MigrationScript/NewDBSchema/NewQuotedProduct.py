# =========================================================================================
# Created By  : Giuseppe Barbieri
# Created Date: October 2024
# =========================================================================================
class NewProductQuote:
    def __init__(self, id: int, quoteId: int, productId: int, 
                 quantity: int, quotedPrice: float, productCondition: str,
                 comment: str, createdAt: str, updatedAt: str):
        self.id = id
        self.quoteId = quoteId
        self.productId = productId
        self.quantity = quantity
        self.quotedPrice = quotedPrice
        self.productCondition = productCondition
        self.comment = comment
        self.createdAt = createdAt
        self.updatedAt = updatedAt
# =========================================================================================
# End
# =========================================================================================