# =========================================================================================
# Created By  : Giuseppe Barbieri
# Created Date: October 2024
# =========================================================================================
class NewQuotes:
    def __init__(self, id: int, companyId: int, userId: int, dateQuoted: str, 
                 sold: bool, createdAt: str, updatedAt: int):
        self.id = id
        self.companyId = companyId
        self.userId = userId
        self.dateQuoted = dateQuoted
        self.sold = sold
        self.createdAt = createdAt
        self.updatedAt = updatedAt
# =========================================================================================
# End
# =========================================================================================