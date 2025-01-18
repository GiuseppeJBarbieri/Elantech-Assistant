# =========================================================================================
# Created By  : Giuseppe Barbieri
# Created Date: October 2024
# =========================================================================================
class NewInventory:
    def __init__(self, id: int, productId: int, removedInventoryId: int, purchaseOrderId: int, 
                 serialNumber: str, condition:str, warrantyExpiration: str, tested: bool, 
                 testedDate: str, comment: str, location: str, createdAt: str, updatedAt: str, reserved: bool):
        self.id = id
        self.productId = productId
        self.removedInventoryId = removedInventoryId
        self.purchaseOrderId = purchaseOrderId
        self.serialNumber = serialNumber
        self.condition = condition
        self.warrantyExpiration = warrantyExpiration
        self.tested = tested
        self.testedDate = testedDate
        self.comment = comment
        self.location = location
        self.createdAt = createdAt
        self.updatedAt = updatedAt
        self.reserved = reserved
# =========================================================================================
# End
# =========================================================================================