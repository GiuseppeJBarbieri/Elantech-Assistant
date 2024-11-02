# =========================================================================================
# Created By  : Giuseppe Barbieri
# Created Date: October 2024
# =========================================================================================
class NewReceivedOrder:
    def __init__(self, id: int, purchaseOrderNumber: str, companyId: str, userId: int, orderType: str, 
                 trackingNumber: str, dateReceived: str, shippedVia: str, comment: str, createdAt:str, updatedAt: str):
        self.id = id
        self.companyId = companyId
        self.userId = userId
        self.purchaseOrderNumber = purchaseOrderNumber
        self.orderType = orderType
        self.trackingNumber = trackingNumber
        self.dateReceived = dateReceived
        self.shippedVia = shippedVia
        self.comment = comment
        self.createdAt = createdAt
        self.updatedAt = updatedAt
# =========================================================================================
# End
# =========================================================================================