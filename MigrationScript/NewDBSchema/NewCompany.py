# =========================================================================================
# Created By  : Giuseppe Barbieri
# Created Date: October 2024
# =========================================================================================
class NewCompany:
    def __init__(self, id: int, companyType: str, companyName: str, companyRep: str, 
                 phoneNumber: str, email: str, location: str, comments: str, createdAt: str, updatedAt: str):
        self.id = id
        self.companyType = companyType
        self.companyName = companyName
        self.companyRep = companyRep
        self.phoneNumber = phoneNumber
        self.email = email
        self.location = location
        self.comments = comments
        self.createdAt = createdAt
        self.updatedAt = updatedAt
# =========================================================================================
# End
# =========================================================================================