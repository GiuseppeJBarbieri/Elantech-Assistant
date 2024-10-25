# =========================================================================================
# Created By  : Giuseppe Barbieri
# Created Date: October 2024
# =========================================================================================
class NewReceivedOrder:
    def __init__(self, id: int, poNumber: str, companyId: str, userId: int, orderType: str, 
                 trackingNumber: str, dateReceived: str, shippedVia: str, comments: str, createdAt:str, updatedAt: str):
        self.id = id
        self.poNumber = poNumber
        self.companyId = companyId
        self.userId = userId
        self.orderType = orderType
        self.trackingNumber = trackingNumber
        self.dateReceived = dateReceived
        self.shippedVia = shippedVia
        self.comments = comments
        self.createdAt = createdAt
        self.updatedAt = updatedAt
# =========================================================================================
# End
# =========================================================================================