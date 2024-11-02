# =========================================================================================
# Created By  : Giuseppe Barbieri
# Created Date: October 2024
# =========================================================================================
class NewProduct:
    def __init__(self, id: int, userId: int, productNumber: str, altNumber1: str, altNumber2: str, 
                 altNumber3: str, altNumber4: str, altNumber5: str, altNumber6: str, quantity: int, 
                 productType: str, brand: str, description: str, relatedTags: str, createdAt: str, 
                 updatedAt: str):
        self.id = id
        self.userId = userId
        self.productNumber = productNumber
        self.altNumber1 = altNumber1
        self.altNumber2 = altNumber2
        self.altNumber3 = altNumber3
        self.altNumber4 = altNumber4
        self.altNumber5 = altNumber5
        self.altNumber6 = altNumber6
        self.quantity = quantity
        self.productType = productType
        self.brand = brand
        self.description = description
        self.relatedTags = relatedTags
        self.createdAt = createdAt
        self.updatedAt = updatedAt   
# =========================================================================================
# End
# =========================================================================================