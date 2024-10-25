# =========================================================================================
# Created By  : Giuseppe Barbieri
# Created Date: October 2024
# =========================================================================================
class NewInventory:
    def __init__(self, id: int, productId: int, removeId: int, poId: int, serialNumber: str, condition:str, warrantyExpiration: str, isTested: bool, dateTested: str, comment: str, location: str, createdAt: str, updatedAt: str):
        self.id = id
        self.productId = productId
        self.removeId = removeId
        self.poId = poId
        self.serialNumber = serialNumber
        self.condition = condition
        self.warrantyExpiration = warrantyExpiration
        self.isTested = isTested
        self.dateTested = dateTested
        self.comment = comment
        self.location = location
        self.createdAt = createdAt
        self.updatedAt = updatedAt
# =========================================================================================
# End
# =========================================================================================